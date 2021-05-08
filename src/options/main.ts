import { html, render } from 'lit';

// import { browser } from 'webextension-polyfill-ts';
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

const userYouTubeConfig = { ...defaultYouTubeConfig };

const onInputChange = (e) => {
  if (e.target.type === 'checkbox') {
    console.log(e.target.id, e.target.checked);
  }
  if (e.target.type === 'radio') {
    console.log(e.target.name, e.target.dataset.value);
  }
};

const checkboxTmpl = ({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: boolean;
}) => html`
  <li>
    <input
      type="checkbox"
      name=${name}
      id=${name}
      @change=${onInputChange}
      ?checked=${defaultValue}
    />
    <label for=${name}>${name}</label>
  </li>
`;

const radioTmpl = ({
  groupName,
  options,
  defaultValue,
}: {
  groupName: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) => html`
  <fieldset>
    <legend>
      <h2>${groupName}</h2>
    </legend>
    ${options.map(
      (option) =>
        html`<input
            type="radio"
            id=${groupName + '_' + option.value}
            name=${groupName}
            data-value=${option.value}
            @change=${onInputChange}
            ?checked=${option.value === defaultValue}
          />
          <label for=${groupName + '_' + option.value}>${option.label}</label>
          <br />`
    )}
  </fieldset>
`;

const youtubeOptionsTmpl = (config: youtubeSettings) => html`
  ${radioTmpl({
    groupName: 'homeRecommendationsState',
    options: [
      { value: 'hidden', label: 'Hidden' },
      { value: 'limited', label: 'Limited' },
      { value: 'visible', label: 'Visible' },
    ],
    defaultValue: config.homeRecommendationsState,
  })}
  ${radioTmpl({
    groupName: 'previewsState',
    options: [
      { value: 'hidden', label: 'Hidden' },
      { value: 'hoverImg', label: 'Hover Img' },
      { value: 'hoverVideo', label: 'Hover Video' },
      { value: 'visible', label: 'Visible' },
    ],
    defaultValue: config.previewsState,
  })}
  ${checkboxTmpl({
    name: 'hideHomeFeedFilterBar',
    defaultValue: config.hideHomeFeedFilterBar,
  })}
  ${checkboxTmpl({
    name: 'hideExploreTabSidebar',
    defaultValue: config.hideExploreTabSidebar,
  })}
  ${checkboxTmpl({
    name: 'grayNotificationCount',
    defaultValue: config.grayNotificationCount,
  })}
  ${checkboxTmpl({
    name: 'hideCommentsSection',
    defaultValue: config.hideCommentsSection,
  })}
  ${checkboxTmpl({
    name: 'hideRecommendedSidePanelVideo',
    defaultValue: config.hideRecommendedSidePanelVideo,
  })}
  ${checkboxTmpl({
    name: 'hideRecommendationsBottomVideo',
    defaultValue: config.hideRecommendationsBottomVideo,
  })}
  ${checkboxTmpl({
    name: 'hideEndingVideoCards',
    defaultValue: config.hideEndingVideoCards,
  })}
  ${checkboxTmpl({
    name: 'hideEndingVideoRecommendedGrid',
    defaultValue: config.hideEndingVideoRecommendedGrid,
  })}
`;

const youtubeOptionsEl = document.getElementById('youtubeOptions');

if (youtubeOptionsEl)
  render(youtubeOptionsTmpl(userYouTubeConfig), youtubeOptionsEl);

function setItem() {
  console.log('OK');
}

function gotKitten(item) {
  console.log(`${item.kitten.name} has ${item.kitten.eyeCount} eyes`);
}

function gotMonster(item) {
  console.log(`${item.monster.name} has ${item.monster.eyeCount} eyes`);
}

function onError(error) {
  console.log(error);
}
// define 2 objects
let monster = {
  name: 'Kraken',
  tentacles: true,
  eyeCount: 10,
};

let kitten = {
  name: 'Moggy',
  tentacles: false,
  eyeCount: 2,
};

browser.storage.local.set({ kitten, monster }).then(setItem, onError);
browser.storage.local.get('kitten').then(gotKitten, onError);
browser.storage.local.get('monster').then(gotMonster, onError);
