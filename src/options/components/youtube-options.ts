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
                      groupLabel="Recommendations Profile"
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
                                    value="5"
                                    placeholder="10"
                                    min="0"
                                    max="200"
                                    id="recommendationsHomeLimitedNum"
                                  />`
                              : null}

                            <checkbox-item
                              itemName="hideRecommendedSidePanelVideo"
                              itemLabel="Hide Recommendations Side Panel in Video Page"
                              .itemValue=${this.youtubeConfig
                                .hideRecommendedSidePanelVideo}
                            ></checkbox-item>

                            <checkbox-item
                              itemName="hideRecommendationsBottomVideo"
                              itemLabel="Hide Recommendations Bottom Video Page"
                              itemDescription="Praesent eleifend ullamcorper massa, eu scelerisque lectus placerat a. Etiam sapien mauris, dictum in justo id, blandit rutrum metus."
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
                      groupLabel="Metrics Profile"
                      .options=${[
                        {
                          name: 'visible',
                          label: 'Show',
                          description: 'Default page behavior.',
                        },
                        { name: 'hidden', label: 'Hide' },
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
                  groupLabel="Distracting Elements Profile"
                  .options=${[
                    {
                      name: 'visible',
                      label: 'Show',
                      description: 'Default page behavior.',
                    },
                    { name: 'limited', label: 'Limit' },
                    { name: 'hidden', label: 'Hide' },
                    { name: 'custom', label: 'Custom' },
                  ]}
                  .groupValue=${this.youtubeConfig.profileDistractingElements}
                ></radio-group>

                ${
                  this.youtubeConfig.profileDistractingElements === 'custom'
                    ? html`<div class="mt-8">
                        <radio-group
                          groupName="previewsState"
                          groupLabel="Video Previews"
                          .options=${[
                            { name: 'visible', label: 'Show' },
                            {
                              name: 'hoverVideo',
                              label: 'Show animated only on hover',
                            },
                            {
                              name: 'hoverImg',
                              label: 'Show static only on hover',
                            },
                            {
                              name: 'hidden',
                              label: 'Hide',
                              description: 'This is an option description',
                            },
                          ]}
                          .groupValue=${this.youtubeConfig.previewsState}
                        ></radio-group>

                        <checkbox-item
                          itemName="hideHomeFeedFilterBar"
                          itemLabel="Hide Home Feed Filters Bar"
                          itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc nec felis imperdiet fermentum. Donec at turpis ac risus aliquet auctor. Pellentesque mollis fermentum lacus, sed auctor libero elementum et. "
                          .itemValue=${this.youtubeConfig.hideHomeFeedFilterBar}
                        ></checkbox-item>

                        <checkbox-item
                          itemName="hideExploreTabSidebar"
                          itemLabel="Hide Explore Tab Sidebar"
                          .itemValue=${this.youtubeConfig.hideExploreTabSidebar}
                        ></checkbox-item>

                        <checkbox-item
                          itemName="grayNotificationCount"
                          itemLabel="Gray Notification Count"
                          itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                          .itemValue=${this.youtubeConfig.grayNotificationCount}
                        ></checkbox-item>

                        <checkbox-item
                          itemName="hideCommentsSection"
                          itemLabel="Hide Comments Section in Video Page"
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
