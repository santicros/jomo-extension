import { EventObject } from 'xstate';

export const isProd = import.meta.env.PROD;

export const configKeysArray = ['youtubeConfig', 'twitterConfig'] as const;
export type ConfigKey = typeof configKeysArray[number];

export type ChangeEventPayload = {
  property: 'string';
  value: 'string' | boolean;
  source: ConfigKey;
};

// XState Assert Event Type
export function assertEventType<
  TE extends EventObject,
  TType extends TE['type']
>(event: TE, eventType: TType): asserts event is TE & { type: TType } {
  if (event.type !== eventType) {
    throw new Error(
      `Invalid event: expected "${eventType}", got "${event.type}"`
    );
  }
}

// Web Extension Storage APIS
export const fetchStorageConfig = (id: ConfigKey | typeof configKeysArray) =>
  browser.storage.sync.get(id);

export const setStorageConfig = (id: ConfigKey, config: object) =>
  browser.storage.sync.set({ [id]: config });

export const clearStorageConfig = () => browser.storage.sync.clear();
