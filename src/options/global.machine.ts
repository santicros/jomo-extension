import { createModel } from 'xstate/lib/model';

import { defaultTwitterConfig } from '../interventions/twitter/defaults';
import { defaultYouTubeConfig } from '../interventions/youtube/defaults';
import {
  assertEventType,
  ChangeEventPayload,
  configKeysArray,
  fetchStorageConfig,
  setStorageConfig,
} from './utils';

const machineModel = createModel(
  {
    youtubeConfig: defaultYouTubeConfig,
    twitterConfig: defaultTwitterConfig,
  },
  {
    events: {
      LOAD_CONFIG: () => ({}),
      'done.invoke.fetchRemoteConfig': (data: {
        youtubeConfig: typeof defaultYouTubeConfig;
        twitterConfig: typeof defaultTwitterConfig;
      }) => ({
        data,
      }),
      UPDATE_CONFIG: (changed: ChangeEventPayload) => ({
        changed,
      }),
    },
  }
);

const updateContextConfig = machineModel.assign((context, event) => {
  assertEventType(event, 'UPDATE_CONFIG');
  console.log('changed', event);
  return {
    [event.changed.source]: {
      ...context[event.changed.source],
      [event.changed.property]: event.changed.value,
    },
  };
});

const setContextConfig = machineModel.assign({
  youtubeConfig: (_, event) => {
    assertEventType(event, 'done.invoke.fetchRemoteConfig');
    return {
      ...defaultYouTubeConfig,
      ...event.data.youtubeConfig,
    };
  },
  twitterConfig: (_, event) => {
    assertEventType(event, 'done.invoke.fetchRemoteConfig');
    return {
      ...defaultTwitterConfig,
      ...event.data.twitterConfig,
    };
  },
});

export const machine = machineModel.createMachine(
  {
    id: 'settings',
    context: machineModel.initialContext,
    initial: 'idle',
    states: {
      idle: {
        on: { LOAD_CONFIG: 'loading' },
      },
      loading: {
        invoke: {
          id: 'fetchRemoteConfig',
          src: 'fetchRemoteConfig',
          onDone: { target: 'loaded', actions: 'setContextConfig' },
          onError: {
            actions: (_, event) => console.log('ERROR', event.data),
          },
        },
      },
      loaded: {
        on: {
          UPDATE_CONFIG: {
            actions: ['updateContextConfig', 'updateRemoteConfig'],
          },
        },
      },
    },
  },
  {
    actions: {
      setContextConfig: setContextConfig,
      updateContextConfig: updateContextConfig,
      updateRemoteConfig: (context, event) => {
        assertEventType(event, 'UPDATE_CONFIG');
        setStorageConfig(event.changed.source, context[event.changed.source]);
      },
    },
    services: {
      fetchRemoteConfig: () => fetchStorageConfig(configKeysArray),
    },
  }
);

export const mockMachine = machine.withConfig({
  actions: {
    updateRemoteConfig: () => {},
  },
  services: {
    fetchRemoteConfig: async () => ({}),
  },
});
