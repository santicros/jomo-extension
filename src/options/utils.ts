// import { browser } from 'webextension-polyfill-ts';
import { EventObject } from 'xstate';

import { YoutubeSettings } from '../interventions/youtube/types';

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
export const fetchStorageConfig = (id: string) => browser.storage.sync.get(id);

export const setStorageConfig = (id: string, config: YoutubeSettings) =>
  browser.storage.sync.set({ [id]: config });

export const clearStorageConfig = () => browser.storage.sync.clear();
