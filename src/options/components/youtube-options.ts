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
        ${headerSection('YouTube', this.youtubeConfig.isActive)}
        ${this.youtubeConfig.isActive
          ? html`<div class="mt-4 space-y-6">
              <section>
                ${expandableCard(
                  'Recommendations',
                  html`<radio-group
                      groupName="profileRecommendations"
                      groupLabel="Profile"
                      groupDescription="Choose a default profile that affects many elements on the page, or create a custom setting."
                      .options=${[
                        {
                          name: 'visible',
                          label: 'Visible',
                        },
                        { name: 'limited', label: 'Limited' },
                        {
                          name: 'hidden',
                          label: 'Hidden',
                          description:
                            'Remove addictive algoritmic recommendations',
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
                                    min="0"
                                    max="200"
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
                      : null}`
                )}
              </section>

              <section>
                ${expandableCard(
                  'Metrics',
                  html`<radio-group
                      groupName="profileMetrics"
                      groupLabel="Profile"
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
                      : null}`
                )}
              </section>

              <section>
                ${expandableCard(
                  'Distracting Elements',
                  html`<radio-group
                  groupName="profileDistractingElements"
                  groupLabel="Profile"
                  .options=${[
                    { name: 'visible', label: 'Visible' },
                    { name: 'limited', label: 'Limited' },
                    { name: 'hidden', label: 'Hidden' },
                    { name: 'custom', label: 'Custom' },
                  ]}
                  .groupValue=${this.youtubeConfig.profileDistractingElements}
                ></radio-group>

                ${
                  this.youtubeConfig.profileDistractingElements === 'custom'
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
                          itemLabel="Hide Comments Section"
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
