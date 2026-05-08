import React from 'react';

/**
 * Web shim for @stripe/stripe-react-native.
 * The native Stripe SDK is iOS/Android only. On web we expose no-op
 * implementations so screens that import Stripe can render — actual
 * payment flows must use Stripe.js / @stripe/react-stripe-js.
 */

export const StripeProvider = ({ children }: any) => <>{children}</>;

const noop = async () => ({ error: { message: 'Stripe is not available on web' } });

export const useStripe = () => ({
  initPaymentSheet: noop,
  presentPaymentSheet: noop,
  confirmPayment: noop,
  createPaymentMethod: noop,
  retrievePaymentIntent: noop,
  retrieveSetupIntent: noop,
  confirmSetupIntent: noop,
  handleURLCallback: async () => false,
  createToken: noop,
  collectBankAccountForPayment: noop,
  collectBankAccountForSetup: noop,
  verifyMicrodepositsForPayment: noop,
  verifyMicrodepositsForSetup: noop,
  canAddCardToWallet: noop,
  isCardInWallet: noop,
  resetPaymentSheetCustomer: noop,
});

export const CardField = (_props: any) => null;
export const CardForm = (_props: any) => null;
export const ApplePayButton = (_props: any) => null;
export const GooglePayButton = (_props: any) => null;
export const AuBECSDebitForm = (_props: any) => null;

export const useConfirmPayment = () => ({
  confirmPayment: noop,
  loading: false,
});

export const useConfirmSetupIntent = () => ({
  confirmSetupIntent: noop,
  loading: false,
});
