import './components/radio-group';
import './components/checkbox-item';
import './components/toggle-switch';

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { interpret } from 'xstate';

import { machine, machineWithActions } from './machine';

const isProd = import.meta.env.PROD;

const getChangedValue = (target: HTMLInputElement) => {
  if (target.type !== 'checkbox' && target.type !== 'radio') return;
  if (target.type === 'checkbox') {
    return {
      property: target.id,
      value: target.checked,
    };
  } else if (target.type === 'radio') {
    return {
      property: target.name,
      value: target.dataset.value,
    };
  }
};

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
        <div class="flex items-center justify-between">
          <label for="isActive" class="flex-1 cursor-pointer"
            ><h2 class="inline-block text-3xl font-extrabold">
              YouTube
            </h2></label
          >
          <toggle-switch
            inputId="isActive"
            ?ischecked=${this.userYouTubeConfig.isActive}
          ></toggle-switch>
        </div>
        ${this.userYouTubeConfig.isActive
          ? html`<div>
              <section class="mt-6">
                <h1 class="text-2xl font-extrabold">Recommendations</h1>
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
                        .groupValue=${this.userYouTubeConfig
                          .recommendationsHomeState}
                      ></radio-group>
                      ${this.userYouTubeConfig.recommendationsHomeState ===
                      'limited'
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
                        .itemValue=${this.userYouTubeConfig
                          .hideEndingVideoCards}
                      ></checkbox-item>

                      <checkbox-item
                        itemName="hideEndingVideoRecommendedGrid"
                        itemLabel="hideEndingVideoRecommendedGrid"
                        .itemValue=${this.userYouTubeConfig
                          .hideEndingVideoRecommendedGrid}
                      ></checkbox-item>`
                  : null}
              </section>

              <section class="mt-6">
                <h1 class="text-2xl font-extrabold">Metrics</h1>
                <radio-group
                  groupName="profileMetrics"
                  groupLabel="Metrics"
                  .options=${[
                    { name: 'visible', label: 'Visible' },
                    { name: 'hidden', label: 'Hidden' },
                    { name: 'custom', label: 'Custom' },
                  ]}
                  .groupValue=${this.userYouTubeConfig.profileMetrics}
                ></radio-group>

                ${this.userYouTubeConfig.profileMetrics === 'custom'
                  ? html`<p>Advanced Settings metrics</p>
                      <checkbox-item
                        itemName="metricsHideViewCount"
                        itemLabel="metricsHideViewCount"
                        .itemValue=${this.userYouTubeConfig
                          .metricsHideViewCount}
                      ></checkbox-item>
                      <checkbox-item
                        itemName="metricsHideLikesDislikes"
                        itemLabel="metricsHideLikesDislikes"
                        .itemValue=${this.userYouTubeConfig
                          .metricsHideLikesDislikes}
                      ></checkbox-item>
                      <checkbox-item
                        itemName="metricsHideSubscribersCount"
                        itemLabel="metricsHideSubscribersCount"
                        .itemValue=${this.userYouTubeConfig
                          .metricsHideSubscribersCount}
                      ></checkbox-item>`
                  : null}
              </section>

              <section class="mt-6">
                <h1 class="text-2xl font-extrabold">Distracting Elements</h1>
                <radio-group
                  groupName="profileDistractingElements"
                  groupLabel="Distracting Elements"
                  .options=${[
                    { name: 'visible', label: 'Visible' },
                    { name: 'limited', label: 'Limited' },
                    { name: 'hidden', label: 'Hidden' },
                    { name: 'custom', label: 'Custom' },
                  ]}
                  .groupValue=${this.userYouTubeConfig
                    .profileDistractingElements}
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
                        .itemValue=${this.userYouTubeConfig
                          .hideHomeFeedFilterBar}
                      ></checkbox-item>

                      <checkbox-item
                        itemName="hideExploreTabSidebar"
                        itemLabel="Hide Explore Tab Sidebar"
                        .itemValue=${this.userYouTubeConfig
                          .hideExploreTabSidebar}
                      ></checkbox-item>

                      <checkbox-item
                        itemName="grayNotificationCount"
                        itemLabel="Gray Notification Count"
                        itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                        .itemValue=${this.userYouTubeConfig
                          .grayNotificationCount}
                      ></checkbox-item>

                      <checkbox-item
                        itemName="hideCommentsSection"
                        itemLabel="Hide Comments Section"
                        .itemValue=${this.userYouTubeConfig.hideCommentsSection}
                      ></checkbox-item> `
                  : null}
              </section>
            </div>`
          : null}
      </div>
    `;
  }
}
