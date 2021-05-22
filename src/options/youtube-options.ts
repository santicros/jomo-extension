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

  checkboxTmpl = ({
    name,
    label,
    defaultValue,
  }: {
    name: string;
    label: string;
    defaultValue: boolean;
  }) => html`
    <div class="flex">
      <label for=${name} class="flex-grow py-2">${label}</label>
      <input
        type="checkbox"
        name=${name}
        id=${name}
        @change=${this.onInputChange}
        ?checked=${defaultValue}
      />
    </div>
  `;

  radioTmpl = ({
    groupName,
    groupLabel,
    options,
    defaultValue,
  }: {
    groupName: string;
    groupLabel: string;
    options: { name: string; label: string; description?: string }[];
    defaultValue: string;
  }) => html`
    <fieldset class="grid gap-2">
      <legend>
        <h3>${groupLabel}</h3>
        <p>Descriptive text</p>
      </legend>
      ${options.map(
        (option) =>
          html`<div class="block relative">
            <input
              class="absolute top-1/2 left-3 transform -translate-y-1/2 z-10"
              type="radio"
              id=${groupName + '_' + option.name}
              name=${groupName}
              data-value=${option.name}
              @change=${this.onInputChange}
              ?checked=${option.name === defaultValue}
            />
            <label
              for=${groupName + '_' + option.name}
              class="block p-2 pl-9 rounded"
            >
              <span>${option.label}</span>
              ${option.description
                ? html`<p class="text-sm">${option.description}</p>`
                : null}
            </label>
          </div>`
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
          ? html`<p>Limited number</p>`
          : null}
      </li>
      <li>
        ${this.radioTmpl({
          groupName: 'previewsState',
          groupLabel: 'Previews State',
          options: [
            {
              name: 'hidden',
              label: 'Hidden',
              description: 'This is an option description',
            },
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
