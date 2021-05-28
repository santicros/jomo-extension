import { createMachine } from 'xstate';
import { createModel } from 'xstate/lib/model';

import { defaultYouTubeConfig } from '../interventions/youtube/defaults';
import { assertEventType, fetchStorageConfig, setStorageConfig } from './utils';

const youtubeStorageKey = 'youtubeConfig';

const machineModel = createModel(
  {
    userYouTubeConfig: defaultYouTubeConfig,
  },
  {
    events: {
      GET_CONFIG: (value: string) => ({ value }),
      UPDATE_CONFIG: (changed: {
        property: string;
        value: string | boolean;
      }) => ({
        changed,
      }),
      'done.invoke.fetchStorageConfig': (data: { youtubeConfig: object }) => ({
        data,
      }),
    },
  }
);

const updateContextConfig = machineModel.assign({
  userYouTubeConfig: (context, event) => {
    assertEventType(event, 'UPDATE_CONFIG');

    const newConfig = {
      ...context.userYouTubeConfig,
      [event.changed.property]: event.changed.value,
    };

    return newConfig;
  },
});

const setContextConfig = machineModel.assign({
  userYouTubeConfig: (_, event) => {
    assertEventType(event, 'done.invoke.fetchStorageConfig');

    console.log(event);
    console.log(defaultYouTubeConfig);

    const config = {
      ...defaultYouTubeConfig,
      ...event.data[youtubeStorageKey],
    };

    return config;
  },
});

export const machine = createMachine<typeof machineModel>(
  {
    id: 'youtubeSettingsMachine',
    context: machineModel.initialContext,
    initial: 'idle',
    states: {
      idle: {
        on: { GET_CONFIG: 'loading' },
      },
      loading: {
        invoke: {
          id: 'fetchStorageConfig',
          src: 'fetchStorageConfig',
          onDone: {
            target: 'loaded',
            actions: 'setContextConfig',
          },
          onError: {
            target: 'loaded',
            actions: (context, event) => console.log('ERROR', event.data),
          },
        },
      },
      loaded: {
        on: {
          UPDATE_CONFIG: { actions: ['updateContextConfig', 'storeConfig'] },
        },
      },
    },
  },
  {
    actions: {
      updateContextConfig,
      setContextConfig,
      storeConfig: () => {},
    },
    services: {
      fetchStorageConfig: async () => ({}),
    },
  }
);

export const machineWithActions = machine.withConfig({
  actions: {
    storeConfig: (context) =>
      setStorageConfig(youtubeStorageKey, {
        ...defaultYouTubeConfig,
        ...context.userYouTubeConfig,
      }),
  },
  services: {
    fetchStorageConfig: () => fetchStorageConfig(youtubeStorageKey),
  },
});
