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
    return {
      property: target.id,
      value: target.checked,
    };
  }
  if (target.type === 'radio') {
    return {
      property: target.name,
      value: target.dataset.value,
    };
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

    const newObj = {
      ...context.userYouTubeConfig,
      [event.changed.property]: event.changed.value,
    };

    console.log('NEW OBJ', newObj);
    console.log('UPDATE CONFIG', event.changed);

    return newObj;
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

  onInputChange = (e: { target: HTMLInputElement }) => {
    const changed = getChangedValue(e.target);
    if (!changed || changed.property == null || changed.value == null) return;
    this.service.send('UPDATE_CONFIG', { changed });
  };

  render() {
    return html`
      <div @change=${this.onInputChange}>
        <section>
          <h1>Recommendations</h1>
          <radio-group
            groupName="profileRecommendations"
            groupLabel="Recommendations"
            .options=${[
              { name: 'visible', label: 'Visible' },
              { name: 'limited', label: 'Limited' },
              { name: 'hidden', label: 'Hidden' },
              { name: 'custom', label: 'Custom' },
            ]}
            .groupValue=${this.userYouTubeConfig.profileRecommendations}
          ></radio-group>

          ${this.userYouTubeConfig.profileRecommendations === 'custom'
            ? html`<p>Advanced Settings Recommendations</p>
                <radio-group
                  groupName="recommendationsHomeState"
                  groupLabel="Home Recommendations State"
                  .options=${[
                    { name: 'visible', label: 'Visible' },
                    { name: 'limited', label: 'Limited' },
                    { name: 'hidden', label: 'Hidden' },
                  ]}
                  .groupValue=${this.userYouTubeConfig.recommendationsHomeState}
                ></radio-group>
                ${this.userYouTubeConfig.recommendationsHomeState === 'limited'
                  ? html`<label for="recommendationsHomeLimitedNum"
                        >Limited number
                      </label>
                      <input
                        type="number"
                        placeholder="10"
                        id="recommendationsHomeLimitedNum"
                      />`
                  : null}

                <checkbox-item
                  itemName="hideRecommendedSidePanelVideo"
                  itemLabel="hideRecommendedSidePanelVideo"
                  .itemValue=${this.userYouTubeConfig
                    .hideRecommendedSidePanelVideo}
                ></checkbox-item>

                <checkbox-item
                  itemName="hideRecommendationsBottomVideo"
                  itemLabel="hideRecommendationsBottomVideo"
                  itemDescription="Praesent eleifend ullamcorper massa, eu scelerisque lectus placerat a. Etiam sapien mauris, dictum in justo id, blandit rutrum metus."
                  .itemValue=${this.userYouTubeConfig
                    .hideRecommendationsBottomVideo}
                ></checkbox-item>

                <checkbox-item
                  itemName="hideEndingVideoCards"
                  itemLabel="hideEndingVideoCards"
                  .itemValue=${this.userYouTubeConfig.hideEndingVideoCards}
                ></checkbox-item>

                <checkbox-item
                  itemName="hideEndingVideoRecommendedGrid"
                  itemLabel="hideEndingVideoRecommendedGrid"
                  .itemValue=${this.userYouTubeConfig
                    .hideEndingVideoRecommendedGrid}
                ></checkbox-item>`
            : null}
        </section>

        <section>
          <h1>Metrics</h1>
          <radio-group
            groupName="profilelMetrics"
            groupLabel="Metrics"
            .options=${[
              { name: 'visible', label: 'Visible' },
              { name: 'hidden', label: 'Hidden' },
              { name: 'custom', label: 'Custom' },
            ]}
            .groupValue=${this.userYouTubeConfig.profilelMetrics}
          ></radio-group>

          ${this.userYouTubeConfig.profilelMetrics === 'custom'
            ? html`<p>Advanced Settings metrics</p>
                <checkbox-item
                  itemName="metricsHideViewCount"
                  itemLabel="metricsHideViewCount"
                  .itemValue=${this.userYouTubeConfig.metricsHideViewCount}
                ></checkbox-item>
                <checkbox-item
                  itemName="metricsHideLikesDislikes"
                  itemLabel="metricsHideLikesDislikes"
                  .itemValue=${this.userYouTubeConfig.metricsHideLikesDislikes}
                ></checkbox-item>
                <checkbox-item
                  itemName="metricsHideSubscribersCount"
                  itemLabel="metricsHideSubscribersCount"
                  .itemValue=${this.userYouTubeConfig
                    .metricsHideSubscribersCount}
                ></checkbox-item>`
            : null}
        </section>

        <section>
          <h1>Distracting Elements</h1>
          <radio-group
            groupName="profileDistractingElements"
            groupLabel="Distracting Elements"
            .options=${[
              { name: 'visible', label: 'Visible' },
              { name: 'limited', label: 'Limited' },
              { name: 'hidden', label: 'Hidden' },
              { name: 'custom', label: 'Custom' },
            ]}
            .groupValue=${this.userYouTubeConfig.profileDistractingElements}
          ></radio-group>

          ${this.userYouTubeConfig.profileDistractingElements === 'custom'
            ? html`<p>Advanced Settings distractingElements</p>
                <radio-group
                  groupName="previewsState"
                  groupLabel="Previews State"
                  .options=${[
                    { name: 'visible', label: 'Visible' },
                    { name: 'hoverVideo', label: 'Hover Video' },
                    { name: 'hoverImg', label: 'Hover Img' },
                    {
                      name: 'hidden',
                      label: 'Hidden',
                      description: 'This is an option description',
                    },
                  ]}
                  .groupValue=${this.userYouTubeConfig.previewsState}
                ></radio-group>

                <checkbox-item
                  itemName="hideHomeFeedFilterBar"
                  itemLabel="Hide Home Feed FilterBar"
                  itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc nec felis imperdiet fermentum. Donec at turpis ac risus aliquet auctor. Pellentesque mollis fermentum lacus, sed auctor libero elementum et. "
                  .itemValue=${this.userYouTubeConfig.hideHomeFeedFilterBar}
                ></checkbox-item>

                <checkbox-item
                  itemName="hideExploreTabSidebar"
                  itemLabel="Hide Explore Tab Sidebar"
                  .itemValue=${this.userYouTubeConfig.hideExploreTabSidebar}
                ></checkbox-item>

                <checkbox-item
                  itemName="grayNotificationCount"
                  itemLabel="Gray Notification Count"
                  itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                  .itemValue=${this.userYouTubeConfig.grayNotificationCount}
                ></checkbox-item>

                <checkbox-item
                  itemName="hideCommentsSection"
                  itemLabel="Hide Comments Section"
                  .itemValue=${this.userYouTubeConfig.hideCommentsSection}
                ></checkbox-item> `
            : null}
        </section>
      </div>
    `;
  }
}
