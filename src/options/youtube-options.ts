import './components/radio-group';
import './components/checkbox-item';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createMachine, interpret } from 'xstate';

import { defaultYouTubeConfig } from '../interventions/youtube/defaults';
import { youtubeSettings } from '../interventions/youtube/types';

const fetchStorageConfig = (id: string) => browser.storage.sync.get(id);

const setStorageConfig = (id: string, config: youtubeSettings) =>
  browser.storage.sync.set({ [id]: config });

const clearStorageConfig = () => browser.storage.sync.clear();

const getChangedValue = (target: HTMLInputElement) => {
  if (target.type !== 'checkbox' && target.type !== 'radio') return;

  if (target.type === 'checkbox') {
    return { property: target.id, value: target.checked };
  }
  if (target.type === 'radio') {
    return { property: target.name, value: target.dataset.value };
  }
};

const machine = createMachine(
  {
    id: 'youtubeSettingsMachine',
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
            actions: () => console.log('DONE'),
          },
          onError: {
            target: 'loaded',
            actions: () => console.log('ERROR'),
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
      updateConfig: (context, event) => console.log('UPDATE CONFIG', event),
    },
    services: {
      fetchStorageConfig: async (context, event) => {
        console.log('FETCHING URL', context, event);
        return { title: 'test' };
      },
    },
  }
);

const youtubeStorageKey = 'youtubeConfig';

const machineWithActions = machine.withConfig({
  actions: {
    updateConfig: (context, event) =>
      setStorageConfig(youtubeStorageKey, defaultYouTubeConfig),
  },
  services: {
    fetchStorageConfig: () => fetchStorageConfig(youtubeStorageKey),
  },
});

const isProd = import.meta.env.PROD;

@customElement('youtube-options')
export class YoutubeOptions extends LitElement {
  protected createRenderRoot() {
    return this;
  }
  readonly service;

  @property({ type: Object })
  userYouTubeConfig: youtubeSettings = defaultYouTubeConfig;

  constructor() {
    super();

    this.service = interpret(isProd ? machineWithActions : machine)
      .onTransition((state) => {
        if (state.changed) this.requestUpdate();
        console.log(state.value);
      })
      .start();

    this.service.send('GET_CONFIG');

    const onStoragedState = (state) => {
      this.userYouTubeConfig = {
        ...defaultYouTubeConfig,
        ...state.youtubeConfig,
      };
    };

    const onErrorStoragedState = (error) => {
      this.userYouTubeConfig = { ...defaultYouTubeConfig };
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.stop();
  }

  onInputChange = (e: {
    target: HTMLInputElement;
    dataset: { value?: string };
    value: boolean | string;
  }) => {
    const changed = getChangedValue(e.target);

    if (!changed || changed.property == null || changed.value == null) return;
    this.service.send('UPDATE_CONFIG', changed);
    // this.userYouTubeConfig = { ...this.userYouTubeConfig, [property]: value };
    // storeYoutubeConfig(this.userYouTubeConfig);
  };

  render() {
    return html`
      <div @change=${this.onInputChange}>
        <p>${this.service.state.value}</p>
        <li>
          <radio-group
            groupName="homeRecommendationsState"
            groupLabel="Home Recommendations State"
            .options=${[
              { name: 'hidden', label: 'Hidden' },
              { name: 'limited', label: 'Limited' },
              { name: 'visible', label: 'Visible' },
            ]}
            .groupDefault=${this.userYouTubeConfig.homeRecommendationsState}
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
            .groupDefault=${this.userYouTubeConfig.previewsState}
          ></radio-group>
        </li>
        <li>
          <checkbox-item
            itemName="hideHomeFeedFilterBar"
            itemLabel="Hide Home Feed FilterBar"
            itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc nec felis imperdiet fermentum. Donec at turpis ac risus aliquet auctor. Pellentesque mollis fermentum lacus, sed auctor libero elementum et. "
            .itemDefault=${this.userYouTubeConfig.hideHomeFeedFilterBar}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideExploreTabSidebar"
            itemLabel="Hide Explore Tab Sidebar"
            .itemDefault=${this.userYouTubeConfig.hideExploreTabSidebar}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="grayNotificationCount"
            itemLabel="Gray Notification Count"
            itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
            .itemDefault=${this.userYouTubeConfig.grayNotificationCount}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideCommentsSection"
            itemLabel="Hide Comments Section"
            .itemDefault=${this.userYouTubeConfig.hideCommentsSection}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideRecommendedSidePanelVideo"
            itemLabel="hideRecommendedSidePanelVideo"
            .itemDefault=${this.userYouTubeConfig.hideRecommendedSidePanelVideo}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideRecommendationsBottomVideo"
            itemLabel="hideRecommendationsBottomVideo"
            itemDescription="Praesent eleifend ullamcorper massa, eu scelerisque lectus placerat a. Etiam sapien mauris, dictum in justo id, blandit rutrum metus."
            .itemDefault=${this.userYouTubeConfig
              .hideRecommendationsBottomVideo}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideEndingVideoCards"
            itemLabel="hideEndingVideoCards"
            .itemDefault=${this.userYouTubeConfig.hideEndingVideoCards}
          ></checkbox-item>
        </li>
        <li>
          <checkbox-item
            itemName="hideEndingVideoRecommendedGrid"
            itemLabel="hideEndingVideoRecommendedGrid"
            .itemDefault=${this.userYouTubeConfig
              .hideEndingVideoRecommendedGrid}
          ></checkbox-item>
        </li>
      </div>
    `;
  }
}
