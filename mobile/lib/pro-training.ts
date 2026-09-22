import { supabase } from './supabase';
import { PRO_TRAINING } from '@/constants/business-rules';

// =============================================
// Pro Training Fee (初期講習費用 — 先着100名半額キャンペーン + 未経験者向け道具セット)
// =============================================
// training_registrations テーブル:
//   id, pro_id, experience_level, sequence_number,
//   base_fee, early_bird_applied, kit_fee, total_fee,
//   status ('pending_payment' | 'paid'), stripe_payment_intent_id, created_at

type Result<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface TrainingFeeBreakdown {
  baseFee: number;
  earlyBirdApplied: boolean;
  kitFee: number;
  totalFee: number;
}

// ---------------------------------------------------------------------------
// 1. getTrainingRegistrationCount
// ---------------------------------------------------------------------------

/** 現時点までの講習登録件数（先着キャンペーンの判定に使用）。 */
export async function getTrainingRegistrationCount(): Promise<Result<number>> {
  const { count, error } = await supabase
    .from('training_registrations')
    .select('id', { count: 'exact', head: true });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: count ?? 0 };
}

// ---------------------------------------------------------------------------
// 2. calculateTrainingFee — 純粋関数（登録前の見積もり表示用）
// ---------------------------------------------------------------------------

/**
 * 講習費用を計算する。
 * @param currentCount 既存の登録件数（この人はcurrentCount+1番目の登録になる）
 * @param isBeginner 未経験者かどうか（道具セットを付けるか）
 */
export function calculateTrainingFee(
  currentCount: number,
  isBeginner: boolean,
): TrainingFeeBreakdown {
  const earlyBirdApplied = currentCount < PRO_TRAINING.EARLY_BIRD_LIMIT;
  const baseFee = earlyBirdApplied ? PRO_TRAINING.EARLY_BIRD_FEE : PRO_TRAINING.BASE_FEE;
  const kitFee = isBeginner ? PRO_TRAINING.BEGINNER_KIT_FEE : 0;

  return {
    baseFee,
    earlyBirdApplied,
    kitFee,
    totalFee: baseFee + kitFee,
  };
}

// ---------------------------------------------------------------------------
// 3. registerForTraining
// ---------------------------------------------------------------------------

/**
 * 講習に登録し、その時点の登録件数から先着キャンペーンの適用有無を確定して記録する。
 * 経験年数が {@link PRO_TRAINING.BEGINNER_EXPERIENCE_LEVEL} の場合は道具セット代を加算する。
 */
export async function registerForTraining(
  proId: string,
  experienceLevel: string,
): Promise<Result<{ registrationId: string; fee: TrainingFeeBreakdown }>> {
  const countResult = await getTrainingRegistrationCount();
  if (!countResult.success) {
    return { success: false, error: countResult.error };
  }

  const currentCount = countResult.data ?? 0;
  const isBeginner = experienceLevel === PRO_TRAINING.BEGINNER_EXPERIENCE_LEVEL;
  const fee = calculateTrainingFee(currentCount, isBeginner);

  const { data, error } = await supabase
    .from('training_registrations')
    .insert({
      pro_id: proId,
      experience_level: experienceLevel,
      sequence_number: currentCount + 1,
      base_fee: fee.baseFee,
      early_bird_applied: fee.earlyBirdApplied,
      kit_fee: fee.kitFee,
      total_fee: fee.totalFee,
      status: 'pending_payment',
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: { registrationId: data.id, fee } };
}

// ---------------------------------------------------------------------------
// 4. markTrainingFeePaid
// ---------------------------------------------------------------------------

export async function markTrainingFeePaid(
  registrationId: string,
  stripePaymentIntentId: string,
): Promise<Result> {
  const { error } = await supabase
    .from('training_registrations')
    .update({
      status: 'paid',
      stripe_payment_intent_id: stripePaymentIntentId,
      paid_at: new Date().toISOString(),
    })
    .eq('id', registrationId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// 5. getEarlyBirdSlotsRemaining
// ---------------------------------------------------------------------------

/** 半額キャンペーンの残り枠数（0以下は締切）。LP表示用。 */
export async function getEarlyBirdSlotsRemaining(): Promise<Result<number>> {
  const countResult = await getTrainingRegistrationCount();
  if (!countResult.success) {
    return { success: false, error: countResult.error };
  }

  const remaining = PRO_TRAINING.EARLY_BIRD_LIMIT - (countResult.data ?? 0);
  return { success: true, data: Math.max(0, remaining) };
}
