import './radio-group';
import './checkbox-item';
import './toggle-switch';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { defaultYouTubeConfig } from '../../interventions/youtube/defaults';

@customElement('youtube-options')
export class YoutubeOptions extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  youtubeConfig = defaultYouTubeConfig;

  render() {
    return html`
      <div>
        <div class="flex items-center justify-between">
          <label for="isActive" class="flex-1 cursor-pointer">
            <h2 class="inline-block text-3xl font-extrabold">YouTube</h2>
          </label>
          <toggle-switch
            inputId="isActive"
            ?ischecked=${this.youtubeConfig.isActive}
          ></toggle-switch>
        </div>
        ${this.youtubeConfig.isActive
          ? html`<div>
              <section class="mt-6">
                <details open>
                  <summary
                    class="text-xl font-extrabold cursor-pointer flex items-center"
                  >
                    <div class="chevron">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <h1 class="inline ml-1">Recommendations</h1>
                  </summary>
                  <div class="mt-2 p-6 border rounded-md">
                    <radio-group
                      groupName="profileRecommendations"
                      groupLabel="Recommendations Profile"
                      groupDescription="Descriptive text"
                      .options=${[
                        { name: 'visible', label: 'Visible' },
                        { name: 'limited', label: 'Limited' },
                        { name: 'hidden', label: 'Hidden' },
                        { name: 'custom', label: 'Custom' },
                      ]}
                      .groupValue=${this.youtubeConfig.profileRecommendations}
                    ></radio-group>

                    ${this.youtubeConfig.profileRecommendations === 'custom'
                      ? html`
                          <div class="mt-8">
                            <radio-group
                              groupName="recommendationsHomeState"
                              groupLabel="Home Recommendations State"
                              .options=${[
                                { name: 'visible', label: 'Visible' },
                                { name: 'limited', label: 'Limited' },
                                { name: 'hidden', label: 'Hidden' },
                              ]}
                              .groupValue=${this.youtubeConfig
                                .recommendationsHomeState}
                            ></radio-group>
                            ${this.youtubeConfig.recommendationsHomeState ===
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
                              .itemValue=${this.youtubeConfig
                                .hideRecommendedSidePanelVideo}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideRecommendationsBottomVideo"
                              itemLabel="hideRecommendationsBottomVideo"
                              itemDescription="Praesent eleifend ullamcorper massa, eu scelerisque lectus placerat a. Etiam sapien mauris, dictum in justo id, blandit rutrum metus."
                              .itemValue=${this.youtubeConfig
                                .hideRecommendationsBottomVideo}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideEndingVideoCards"
                              itemLabel="hideEndingVideoCards"
                              .itemValue=${this.youtubeConfig
                                .hideEndingVideoCards}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideEndingVideoRecommendedGrid"
                              itemLabel="hideEndingVideoRecommendedGrid"
                              .itemValue=${this.youtubeConfig
                                .hideEndingVideoRecommendedGrid}
                            ></checkbox-item>
                          </div>
                        `
                      : null}
                  </div>
                </details>
              </section>

              <section class="mt-6">
                <details open>
                  <summary
                    class="text-xl font-extrabold cursor-pointer flex items-center"
                  >
                    <div class="chevron">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <h1 class="inline ml-1">Metrics</h1>
                  </summary>
                  <div class="mt-2 p-6 border rounded-md">
                    <radio-group
                      groupName="profileMetrics"
                      groupLabel="Metrics Profile"
                      .options=${[
                        { name: 'visible', label: 'Visible' },
                        { name: 'hidden', label: 'Hidden' },
                        { name: 'custom', label: 'Custom' },
                      ]}
                      .groupValue=${this.youtubeConfig.profileMetrics}
                    ></radio-group>

                    ${this.youtubeConfig.profileMetrics === 'custom'
                      ? html`<div class="mt-8">
                          <checkbox-item
                            itemName="metricsHideViewCount"
                            itemLabel="metricsHideViewCount"
                            .itemValue=${this.youtubeConfig
                              .metricsHideViewCount}
                          ></checkbox-item>
                          <checkbox-item
                            itemName="metricsHideLikesDislikes"
                            itemLabel="metricsHideLikesDislikes"
                            .itemValue=${this.youtubeConfig
                              .metricsHideLikesDislikes}
                          ></checkbox-item>
                          <checkbox-item
                            itemName="metricsHideSubscribersCount"
                            itemLabel="metricsHideSubscribersCount"
                            .itemValue=${this.youtubeConfig
                              .metricsHideSubscribersCount}
                          ></checkbox-item>
                        </div>`
                      : null}
                  </div>
                </details>
              </section>

              <section class="mt-6">
                <details open>
                  <summary
                    class="text-xl font-extrabold cursor-pointer flex items-center"
                  >
                    <div class="chevron">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <h1 class="inline ml-1">Distracting Elements</h1>
                  </summary>
                  <div class="mt-2 p-6 border rounded-md">
                    <radio-group
                      groupName="profileDistractingElements"
                      groupLabel="Distracting Elements Profile"
                      .options=${[
                        { name: 'visible', label: 'Visible' },
                        { name: 'limited', label: 'Limited' },
                        { name: 'hidden', label: 'Hidden' },
                        { name: 'custom', label: 'Custom' },
                      ]}
                      .groupValue=${this.youtubeConfig
                        .profileDistractingElements}
                    ></radio-group>

                    ${this.youtubeConfig.profileDistractingElements === 'custom'
                      ? html`<div class="mt-8">
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
                            .groupValue=${this.youtubeConfig.previewsState}
                          ></radio-group>

                          <checkbox-item
                            itemName="hideHomeFeedFilterBar"
                            itemLabel="Hide Home Feed FilterBar"
                            itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc nec felis imperdiet fermentum. Donec at turpis ac risus aliquet auctor. Pellentesque mollis fermentum lacus, sed auctor libero elementum et. "
                            .itemValue=${this.youtubeConfig
                              .hideHomeFeedFilterBar}
                          ></checkbox-item>

                          <checkbox-item
                            itemName="hideExploreTabSidebar"
                            itemLabel="Hide Explore Tab Sidebar"
                            .itemValue=${this.youtubeConfig
                              .hideExploreTabSidebar}
                          ></checkbox-item>

                          <checkbox-item
                            itemName="grayNotificationCount"
                            itemLabel="Gray Notification Count"
                            itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                            .itemValue=${this.youtubeConfig
                              .grayNotificationCount}
                          ></checkbox-item>

                          <checkbox-item
                            itemName="hideCommentsSection"
                            itemLabel="Hide Comments Section"
                            .itemValue=${this.youtubeConfig.hideCommentsSection}
                          ></checkbox-item>
                        </div>`
                      : null}
                  </div>
                </details>
              </section>
            </div>`
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'youtube-options': YoutubeOptions;
  }
}
