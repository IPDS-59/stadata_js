import { CancelledException } from '../exceptions';

/**
 * Token for cancelling ongoing requests
 * Uses AbortController under the hood
 */
export class CancelToken {
  private abortController: AbortController;
  private _isCancelled = false;
  private _reason?: string;

  constructor() {
    this.abortController = new AbortController();
  }

  /**
   * Gets the AbortSignal for use with fetch
   */
  get signal(): AbortSignal {
    return this.abortController.signal;
  }

  /**
   * Checks if the request has been cancelled
   */
  get isCancelled(): boolean {
    return this._isCancelled;
  }

  /**
   * Gets the cancellation reason
   */
  get reason(): string | undefined {
    return this._reason;
  }

  /**
   * Cancels the request
   * @param reason - Optional reason for cancellation
   */
  cancel(reason?: string): void {
    if (this._isCancelled) {
      return;
    }

    this._isCancelled = true;
    this._reason = reason;
    this.abortController.abort();
  }

  /**
   * Throws a CancelledException if the request was cancelled
   */
  throwIfCancelled(): void {
    if (this._isCancelled) {
      throw new CancelledException(this._reason || 'Request was cancelled');
    }
  }

  /**
   * Creates a new CancelToken
   */
  static create(): CancelToken {
    return new CancelToken();
  }

  /**
   * Creates a CancelToken that can be cancelled from outside
   * Returns both the token and a cancel function
   */
  static source(): { token: CancelToken; cancel: (reason?: string) => void } {
    const token = new CancelToken();
    return {
      token,
      cancel: (reason?: string) => token.cancel(reason),
    };
  }
}
