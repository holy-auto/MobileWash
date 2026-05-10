import React from 'react';

/**
 * Web shim for @stripe/stripe-react-native.
 * The native module is iOS/Android-only and breaks the web bundle, so on web
 * we replace it with stubs. The booking/payment + boost flows surface an
 * "決済エラー" alert which is acceptable for UI preview — payments are tested
 * on native builds only.
 */

type AsyncResult = { error: { message: string; code: string } | null };

const WEB_ERROR = {
  message: '決済機能はネイティブアプリで利用できます (Web プレビューでは無効)',
  code: 'WEB_NOT_SUPPORTED',
};

export function StripeProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function useStripe() {
  return {
    initPaymentSheet: async (): Promise<AsyncResult> => ({ error: WEB_ERROR }),
    presentPaymentSheet: async (): Promise<AsyncResult> => ({ error: WEB_ERROR }),
    confirmPayment: async (): Promise<AsyncResult> => ({ error: WEB_ERROR }),
    retrievePaymentIntent: async (): Promise<AsyncResult> => ({ error: WEB_ERROR }),
    createPaymentMethod: async (): Promise<AsyncResult> => ({ error: WEB_ERROR }),
  };
}

export function useConfirmPayment() {
  return {
    confirmPayment: async (): Promise<AsyncResult> => ({ error: WEB_ERROR }),
    loading: false,
  };
}

export const CardField = (_props: any) => null;
export const CardForm = (_props: any) => null;
export const ApplePayButton = (_props: any) => null;
export const GooglePayButton = (_props: any) => null;
