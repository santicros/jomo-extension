import './components/radio-group';
import './components/checkbox-item';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { defaultYouTubeConfig } from '../interventions/youtube/defaults';
import { youtubeSettings } from '../interventions/youtube/types';

function setItem() {
  console.log('OK');
}

function onError(error) {
  console.error(error);
}

// const storeYoutubeConfig = (config: youtubeSettings) => {
//   browser.storage.sync.set({ youtubeConfig: config }).then(setItem, onError);
// };

@customElement('youtube-options')
export class YoutubeOptions extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  userYouTubeConfig = {};

  constructor() {
    super();
    // browser.storage.sync.clear();
    const onStoragedState = (state) => {
      console.log('GOT', state);
      this.userYouTubeConfig = {
        ...defaultYouTubeConfig,
        ...state.youtubeConfig,
      };
    };

    const onErrorStoragedState = (error) => {
      console.log('ERR', error);
      this.userYouTubeConfig = { ...defaultYouTubeConfig };
    };

    // browser.storage.sync
    //   .get('youtubeConfig')
    //   .then(onStoragedState, onErrorStoragedState);
  }

  onInputChange = (e) => {
    if (e.target.type === 'checkbox') {
      const property = e.target.id;
      const value: boolean = e.target.checked;
      this.userYouTubeConfig = { ...this.userYouTubeConfig, [property]: value };
      // storeYoutubeConfig(this.userYouTubeConfig);
    }
    if (e.target.type === 'radio') {
      const property = e.target.name;
      const value: boolean = e.target.dataset.value;
      this.userYouTubeConfig = { ...this.userYouTubeConfig, [property]: value };
      // storeYoutubeConfig(this.userYouTubeConfig);
    }
  };

  render() {
    return html`
      <li>
        <radio-group
          groupName="homeRecommendationsState"
          groupLabel="Home Recommendations State"
          .options=${[
            { name: 'hidden', label: 'Hidden' },
            { name: 'limited', label: 'Limited' },
            { name: 'visible', label: 'Visible' },
          ]}
          .defaultValue=${this.userYouTubeConfig.homeRecommendationsState}
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
          .defaultValue=${this.userYouTubeConfig.previewsState}
        ></radio-group>
      </li>
      <li>
        <checkbox-item
          itemName="hideHomeFeedFilterBar"
          itemLabel="Hide Home Feed FilterBar"
          .defaultValue=${this.userYouTubeConfig.hideHomeFeedFilterBar}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="hideExploreTabSidebar"
          itemLabel="Hide Explore Tab Sidebar"
          .defaultValue=${this.userYouTubeConfig.hideExploreTabSidebar}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="grayNotificationCount"
          itemLabel="Gray Notification Count"
          .defaultValue=${this.userYouTubeConfig.grayNotificationCount}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="hideCommentsSection"
          itemLabel="Hide Comments Section"
          .defaultValue=${this.userYouTubeConfig.hideCommentsSection}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="hideRecommendedSidePanelVideo"
          itemLabel="hideRecommendedSidePanelVideo"
          .defaultValue=${this.userYouTubeConfig.hideRecommendedSidePanelVideo}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="hideRecommendationsBottomVideo"
          itemLabel="hideRecommendationsBottomVideo"
          .defaultValue=${this.userYouTubeConfig.hideRecommendationsBottomVideo}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="hideEndingVideoCards"
          itemLabel="hideEndingVideoCards"
          .defaultValue=${this.userYouTubeConfig.hideEndingVideoCards}
        ></checkbox-item>
      </li>
      <li>
        <checkbox-item
          itemName="hideEndingVideoRecommendedGrid"
          itemLabel="hideEndingVideoRecommendedGrid"
          .defaultValue=${this.userYouTubeConfig.hideEndingVideoRecommendedGrid}
        ></checkbox-item>
      </li>
    `;
  }
}
