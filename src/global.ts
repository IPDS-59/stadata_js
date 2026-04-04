import { createStadataClient, StadataClientConfig, StadataClientInstance } from './client';

let _globalClient: StadataClientInstance | null = null;

/**
 * Initialize the global Stadata client. Call this once at your app entry point.
 *
 * @example
 * ```typescript
 * // main.ts / app entry point
 * import { initStadata } from 'stadata-js'
 *
 * initStadata({ apiKey: 'your-api-key' })
 * ```
 */
export function initStadata(config: StadataClientConfig): StadataClientInstance {
  _globalClient = createStadataClient(config);
  return _globalClient;
}

/**
 * Get the global Stadata client instance.
 * Throws if initStadata() has not been called yet.
 *
 * @internal — used by composables when called without a client argument
 */
export function getGlobalClient(): StadataClientInstance {
  if (!_globalClient) {
    throw new Error(
      '[stadata-js] Client not initialized. Call initStadata({ apiKey: "..." }) before using composables.'
    );
  }
  return _globalClient;
}

/**
 * Reset the global client (useful for testing).
 * @internal
 */
export function resetGlobalClient(): void {
  _globalClient = null;
}
