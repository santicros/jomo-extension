import './components/radio-group';
import './components/checkbox-item';

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createMachine, interpret } from 'xstate';
import { createModel } from 'xstate/lib/model';

import { defaultYouTubeConfig } from '../interventions/youtube/defaults';
import { assertEventType, fetchStorageConfig, setStorageConfig } from './utils';

const isProd = import.meta.env.PROD;

const youtubeStorageKey = 'youtubeConfig';

const getChangedValue = (target: HTMLInputElement) => {
  if (target.type !== 'checkbox' && target.type !== 'radio') return;

  if (target.type === 'checkbox') {
    return { property: target.id, value: target.checked };
  }
  if (target.type === 'radio') {
    return { property: target.name, value: target.dataset.value };
  }
};

const machineModel = createModel(
  {
    userYouTubeConfig: { ...defaultYouTubeConfig },
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
    },
  }
);

const updateConfig = machineModel.assign({
  userYouTubeConfig: (context, event) => {
    assertEventType(event, 'UPDATE_CONFIG');
    return {
      ...context.userYouTubeConfig,
      [event.changed.property]: event.changed.value,
    };
  },
});

const machine = createMachine<typeof machineModel>(
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
            actions: (context, event) => {
              // const onStoragedState = (state) => {
              //   this.userYouTubeConfig = {
              //     ...defaultYouTubeConfig,
              //     ...state.youtubeConfig,
              //   };
              // };
              console.log('DONE', event.data);
            },
          },
          onError: {
            target: 'loaded',
            actions: (context, event) => console.log('ERROR', event.data),
          },
        },
      },
      loaded: {
        on: { UPDATE_CONFIG: { actions: ['updateConfig'] } },
      },
    },
  },
  {
    actions: {
      updateConfig: updateConfig,
    },
    services: {
      fetchStorageConfig: async (context, event) => {
        console.log('FETCHING URL', context, event);
        return { title: 'test' };
      },
    },
  }
);

const machineWithActions = machine.withConfig({
  actions: {
    updateConfig: (context, event) =>
      setStorageConfig(youtubeStorageKey, defaultYouTubeConfig),
  },
  services: {
    fetchStorageConfig: () => fetchStorageConfig(youtubeStorageKey),
  },
});

@customElement('youtube-options')
export class YoutubeOptions extends LitElement {
  protected createRenderRoot() {
    return this;
  }
  readonly service;

  constructor() {
    super();

    this.service = interpret(isProd ? machineWithActions : machine)
      .onTransition((state) => {
        if (state.changed) this.requestUpdate();
        console.log(state.value);
      })
      .start();

    this.service.send('GET_CONFIG');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.stop();
  }

  get userYouTubeConfig() {
    return this.service.state.context.userYouTubeConfig;
  }

  onInputChange = (e: {
    target: HTMLInputElement;
    dataset: { value?: string };
    value: boolean | string;
  }) => {
    const changed = getChangedValue(e.target);
    if (!changed || changed.property == null || changed.value == null) return;
    this.service.send('UPDATE_CONFIG', { changed });
  };

  render() {
    return html`
      <div @change=${this.onInputChange}>
        <li>
          <radio-group
            groupName="homeRecommendationsState"
            groupLabel="Home Recommendations State"
            .options=${[
              { name: 'hidden', label: 'Hidden' },
              { name: 'limited', label: 'Limited' },
              { name: 'visible', label: 'Visible' },
            ]}
            .groupValue=${this.userYouTubeConfig.homeRecommendationsState}
          ></radio-group>
        </li>
        <li>
          ${this.userYouTubeConfig.homeRecommendationsState === 'limited'
            ? html`<p>Limited number</p>`
            : null}
        </li>
        <li>
          <radio-group
            groupName="previewsState"
            groupLabel="Previews State"
            .options=${[
              {
                name: 'hidden',
                label: 'Hidden',
                description: 'This is an option description',
              },
              { name: 'hoverImg', label: 'Hover Img' },
              { name: 'hoverVideo', label: 'Hover Video' },
              { name: 'visible', label: 'Visible' },
            ]}
            .groupValue=${this.userYouTubeConfig.previewsState}
          ></radio-group>
        </li>
        <li>
          <checkbox-item
            itemName="hideHomeFeedFilterBar"
            itemLabel="Hide Home Feed FilterBar"
            itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc nec felis imperdiet fermentum. Donec at turpis ac risus aliquet auctor. Pellentesque mollis fermentum lacus, sed auctor libero elementum et. "
            .itemValue=${this.userYouTubeConfig.hideHomeFeedFilterBar}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideExploreTabSidebar"
            itemLabel="Hide Explore Tab Sidebar"
            .itemValue=${this.userYouTubeConfig.hideExploreTabSidebar}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="grayNotificationCount"
            itemLabel="Gray Notification Count"
            itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
            .itemValue=${this.userYouTubeConfig.grayNotificationCount}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideCommentsSection"
            itemLabel="Hide Comments Section"
            .itemValue=${this.userYouTubeConfig.hideCommentsSection}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideRecommendedSidePanelVideo"
            itemLabel="hideRecommendedSidePanelVideo"
            .itemValue=${this.userYouTubeConfig.hideRecommendedSidePanelVideo}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideRecommendationsBottomVideo"
            itemLabel="hideRecommendationsBottomVideo"
            itemDescription="Praesent eleifend ullamcorper massa, eu scelerisque lectus placerat a. Etiam sapien mauris, dictum in justo id, blandit rutrum metus."
            .itemValue=${this.userYouTubeConfig.hideRecommendationsBottomVideo}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideEndingVideoCards"
            itemLabel="hideEndingVideoCards"
            .itemValue=${this.userYouTubeConfig.hideEndingVideoCards}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideEndingVideoRecommendedGrid"
            itemLabel="hideEndingVideoRecommendedGrid"
            .itemValue=${this.userYouTubeConfig.hideEndingVideoRecommendedGrid}
          ></checkbox-item>
        </li>
      </div>
    `;
  }
}
