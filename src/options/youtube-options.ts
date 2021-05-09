import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { youtubeSettings } from '../interventions/youtube/types';

const defaultYouTubeConfig: youtubeSettings = {
  homeRecommendationsState: 'limited',
  homeRecommendationsLimitedShowNum: 2,
  hideHomeFeedFilterBar: true,
  previewsState: 'hidden',
  hideExploreTabSidebar: true,
  grayNotificationCount: true,
  hideCommentsSection: true,
  hideMetrics: true, // not implemented template
  hideMetricsOptions: {
    // not implemented template
    viewCount: true,
    likesAndDislikes: true,
    subscribersCount: true,
  },
  hideRecommendedSidePanelVideo: true,
  hideRecommendationsBottomVideo: true,
  hideEndingVideoCards: true,
  hideEndingVideoRecommendedGrid: true,
};

@customElement('youtube-options')
export class YoutubeOptions extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  userYouTubeConfig = { ...defaultYouTubeConfig };

  onInputChange = (e) => {
    if (e.target.type === 'checkbox') {
      const property = e.target.id;
      const value: boolean = e.target.checked;
      this.userYouTubeConfig = { ...this.userYouTubeConfig, [property]: value };
    }
    if (e.target.type === 'radio') {
      const property = e.target.name;
      const value: boolean = e.target.dataset.value;
      this.userYouTubeConfig = { ...this.userYouTubeConfig, [property]: value };
    }
  };

  checkboxTmpl = ({
    name,
    label,
    defaultValue,
  }: {
    name: string;
    label: string;
    defaultValue: boolean;
  }) => html`
    <input
      type="checkbox"
      name=${name}
      id=${name}
      @change=${this.onInputChange}
      ?checked=${defaultValue}
    />
    <label for=${name}>${label}</label>
  `;

  radioTmpl = ({
    groupName,
    groupLabel,
    options,
    defaultValue,
  }: {
    groupName: string;
    groupLabel: string;
    options: { name: string; label: string }[];
    defaultValue: string;
  }) => html`
    <fieldset>
      <legend>
        <h2>${groupLabel}</h2>
      </legend>
      ${options.map(
        (option) =>
          html`<input
              type="radio"
              id=${groupName + '_' + option.name}
              name=${groupName}
              data-value=${option.name}
              @change=${this.onInputChange}
              ?checked=${option.name === defaultValue}
            />
            <label for=${groupName + '_' + option.name}>${option.label}</label>
            <br />`
      )}
    </fieldset>
  `;

  render() {
    return html`
      <!-- <pre>${JSON.stringify(this.userYouTubeConfig)}</pre> -->
      <li>
        ${this.radioTmpl({
          groupName: 'homeRecommendationsState',
          groupLabel: 'Home Recommendations State',
          options: [
            { name: 'hidden', label: 'Hidden' },
            { name: 'limited', label: 'Limited' },
            { name: 'visible', label: 'Visible' },
          ],
          defaultValue: this.userYouTubeConfig.homeRecommendationsState,
        })}
      </li>
      <li>
        ${this.userYouTubeConfig.homeRecommendationsState === 'limited'
          ? html` <p>Limited number</p>`
          : null}
      </li>
      <li>
        ${this.radioTmpl({
          groupName: 'previewsState',
          groupLabel: 'Previews State',
          options: [
            { name: 'hidden', label: 'Hidden' },
            { name: 'hoverImg', label: 'Hover Img' },
            { name: 'hoverVideo', label: 'Hover Video' },
            { name: 'visible', label: 'Visible' },
          ],
          defaultValue: this.userYouTubeConfig.previewsState,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideHomeFeedFilterBar',
          label: 'Hide Home Feed FilterBar',
          defaultValue: this.userYouTubeConfig.hideHomeFeedFilterBar,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideExploreTabSidebar',
          label: 'Hide Explore Tab Sidebar',
          defaultValue: this.userYouTubeConfig.hideExploreTabSidebar,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'grayNotificationCount',
          label: 'Gray Notification Count',
          defaultValue: this.userYouTubeConfig.grayNotificationCount,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideCommentsSection',
          label: 'Hide Comments Section',
          defaultValue: this.userYouTubeConfig.hideCommentsSection,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideRecommendedSidePanelVideo',
          label: 'hideRecommendedSidePanelVideo',
          defaultValue: this.userYouTubeConfig.hideRecommendedSidePanelVideo,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideRecommendationsBottomVideo',
          label: 'hideRecommendationsBottomVideo',
          defaultValue: this.userYouTubeConfig.hideRecommendationsBottomVideo,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideEndingVideoCards',
          label: 'hideEndingVideoCards',
          defaultValue: this.userYouTubeConfig.hideEndingVideoCards,
        })}
      </li>
      <li>
        ${this.checkboxTmpl({
          name: 'hideEndingVideoRecommendedGrid',
          label: 'hideEndingVideoRecommendedGrid',
          defaultValue: this.userYouTubeConfig.hideEndingVideoRecommendedGrid,
        })}
      </li>
    `;
  }
}
