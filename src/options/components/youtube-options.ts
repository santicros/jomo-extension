import './radio-group';
import './checkbox-item';
import './toggle-switch';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { defaultYouTubeConfig } from '../../interventions/youtube/defaults';
import { expandableCard, headerSection } from './globals';

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
        ${headerSection('youtube', 'YouTube', this.youtubeConfig.isActive)}
        ${this.youtubeConfig.isActive
          ? html`<div class="mt-4 space-y-6">
              <section>
                ${expandableCard(
                  'Recommendations',
                  html`<radio-group
                      groupName="profileRecommendations"
                      groupLabel="Recommendations"
                      groupDescription="Algorithmic recommendations make you stay more time than expected on the platform."
                      .options=${[
                        {
                          name: 'visible',
                          label: 'Show',
                          description: 'Default addictive page behavior.',
                        },
                        {
                          name: 'limited',
                          label: 'Limit',
                          description:
                            'Remove and limit some unnecesary recommendations.',
                        },
                        {
                          name: 'hidden',
                          label: 'Hide',
                          description: 'Remove all recommendations.',
                        },
                        { name: 'custom', label: 'Custom' },
                      ]}
                      .groupValue=${this.youtubeConfig.profileRecommendations}
                    ></radio-group>

                    ${this.youtubeConfig.profileRecommendations === 'custom'
                      ? html`
                          <div class="mt-8">
                            <radio-group
                              groupName="recommendationsHomeState"
                              groupLabel="Homescreen Recommendations"
                              .options=${[
                                { name: 'visible', label: 'Show' },
                                { name: 'limited', label: 'Limit' },
                                { name: 'hidden', label: 'Hide' },
                              ]}
                              .groupValue=${this.youtubeConfig
                                .recommendationsHomeState}
                            ></radio-group>
                            ${this.youtubeConfig.recommendationsHomeState ===
                            'limited'
                              ? html`<label for="recommendationsHomeLimitedNum"
                                    >Home limit number
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="4"
                                    min="0"
                                    max="200"
                                    data-source-key="recommendationsHomeLimitedNum"
                                    id="recommendationsHomeLimitedNum"
                                  />`
                              : null}

                            <checkbox-item
                              itemName="hideRecommendedSidePanelVideo"
                              itemLabel="Hide recommendations at the Side Panel of the Video Page"
                              .itemValue=${this.youtubeConfig
                                .hideRecommendedSidePanelVideo}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideRecommendationsBottomVideo"
                              itemLabel="Hide recommendations at the Bottom of the Video Page"
                              .itemValue=${this.youtubeConfig
                                .hideRecommendationsBottomVideo}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideEndingVideoCards"
                              itemLabel="Hide Ending Cards in Video"
                              .itemValue=${this.youtubeConfig
                                .hideEndingVideoCards}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideEndingVideoRecommendedGrid"
                              itemLabel="Hide Ending Recommended Grid in Video"
                              .itemValue=${this.youtubeConfig
                                .hideEndingVideoRecommendedGrid}
                            ></checkbox-item>
                          </div>
                        `
                      : null}`
                )}
              </section>

              <section>
                ${expandableCard(
                  'Metrics',
                  html`<radio-group
                      groupName="profileMetrics"
                      groupLabel="Metrics"
                      groupDescription="Metrics have impact in how you see other people or content and how you see yourself."
                      .options=${[
                        {
                          name: 'visible',
                          label: 'Show',
                          description:
                            'Default page behavior that shows likes, views, subscriptions...',
                        },
                        {
                          name: 'hidden',
                          label: 'Hide',
                          description: 'Remove all the metrics',
                        },
                        { name: 'custom', label: 'Custom' },
                      ]}
                      .groupValue=${this.youtubeConfig.profileMetrics}
                    ></radio-group>

                    ${this.youtubeConfig.profileMetrics === 'custom'
                      ? html`<div class="mt-8">
                          <checkbox-item
                            itemName="metricsHideViewCount"
                            itemLabel="Hide View Count"
                            .itemValue=${this.youtubeConfig
                              .metricsHideViewCount}
                          ></checkbox-item>
                          <checkbox-item
                            itemName="metricsHideLikesDislikes"
                            itemLabel="Hide Likes and Dislikes Count"
                            .itemValue=${this.youtubeConfig
                              .metricsHideLikesDislikes}
                          ></checkbox-item>
                          <checkbox-item
                            itemName="metricsHideSubscribersCount"
                            itemLabel="Hide Subscribers Count"
                            .itemValue=${this.youtubeConfig
                              .metricsHideSubscribersCount}
                          ></checkbox-item>
                        </div>`
                      : null}`
                )}
              </section>

              <section>
                ${expandableCard(
                  'Distracting Elements',
                  html`<radio-group
                  groupName="profileDistractingElements"
                  groupLabel="Distracting Elements"
                  groupDescription="Some other elements are designed to be distracting and make you spend more time on the platform."
                  .options=${[
                    {
                      name: 'visible',
                      label: 'Show',
                      description: 'Default page behavior.',
                    },
                    {
                      name: 'limited',
                      label: 'Limit',
                      description:
                        'Hide some of the distracting parts of the platform',
                    },
                    {
                      name: 'hidden',
                      label: 'Hide',
                      description: 'Hide all distracting elements',
                    },
                    { name: 'custom', label: 'Custom' },
                  ]}
                  .groupValue=${this.youtubeConfig.profileDistractingElements}
                ></radio-group>

                ${
                  this.youtubeConfig.profileDistractingElements === 'custom'
                    ? html`<div class="mt-8">
                        <radio-group
                          groupName="previewsState"
                          groupLabel="Video Previews Thumbnails"
                          .options=${[
                            { name: 'visible', label: 'Show' },
                            {
                              name: 'hoverVideo',
                              label: 'Show animated preview only on hover',
                            },
                            {
                              name: 'hoverImg',
                              label: 'Show static preview only on hover',
                            },
                            {
                              name: 'hidden',
                              label: 'Hide',
                            },
                          ]}
                          .groupValue=${this.youtubeConfig.previewsState}
                        ></radio-group>

                        <checkbox-item
                          itemName="hideHomeFeedFilterBar"
                          itemLabel="Hide home feed Filters Bar"
                          .itemValue=${this.youtubeConfig.hideHomeFeedFilterBar}
                        ></checkbox-item>

                        <checkbox-item
                          itemName="hideExploreTabSidebar"
                          itemLabel="Hide Explore tab at the Sidebar"
                          .itemValue=${this.youtubeConfig.hideExploreTabSidebar}
                        ></checkbox-item>

                        <checkbox-item
                          itemName="grayNotificationCount"
                          itemLabel="Gray Notification Count"
                          .itemValue=${this.youtubeConfig.grayNotificationCount}
                        ></checkbox-item>

                        <checkbox-item
                          itemName="hideCommentsSection"
                          itemLabel="Hide Comments Section in video page"
                          .itemValue=${this.youtubeConfig.hideCommentsSection}
                        ></checkbox-item>
                      </div>`
                    : null
                }
              </div>`
                )}
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
