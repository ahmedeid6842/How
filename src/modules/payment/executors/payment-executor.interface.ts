export interface ExecutionContext {
  amount: number;
  currency: string;
  metadata: Record<string, any>;
}

export interface ExecutionResult {
  providerTransactionId: string;
  redirectUrl?: string;
  sdkCredentials?: {
    profileId: string;
    serverKey: string;
    clientKey: string;
  };
}

export interface IPaymentExecutor {
  execute(context: ExecutionContext): Promise<ExecutionResult>;
}
