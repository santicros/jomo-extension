<template>
  <h1 class="text-5xl text-red-200">Hola</h1>
  <pre>{{ youtubeState }}</pre>
  <form action="">
    <div>
      <label for="homeRecommendationsState">homeRecommendationsState</label>
      <select
        name="homeRecommendationsState"
        id="homeRecommendationsState"
        v-model="youtubeState.homeRecommendationsState"
      >
        <option value="hidden">Hidden</option>
        <option value="limited">Limited</option>
        <option value="visible">Visible</option>
      </select>
    </div>
    <div>
      <label for="homeRecommendationsToShow">homeRecommendationsToShow</label>
      <input
        type="number"
        name="homeRecommendationsToShow"
        id="homeRecommendationsToShow"
        min="0"
        max="1000"
        v-model.number="youtubeState.homeRecommendationsToShow"
        :disabled="youtubeState.homeRecommendationsState !== 'limited'"
      />
    </div>
    <div>
      <label for="hideHomeFeedFilterBar">hideHomeFeedFilterBar</label>
      <input
        type="checkbox"
        name="hideHomeFeedFilterBar"
        id="hideHomeFeedFilterBar"
        v-model="youtubeState.hideHomeFeedFilterBar"
      />
    </div>
    <div>
      <label for="previewsState">previewsState</label>
      <select
        name="previewsState"
        id="previewsState"
        v-model="youtubeState.previewsState"
      >
        <option value="hidden">hidden</option>
        <option value="hoverImg">hoverImg</option>
        <option value="hoverVideo">hoverVideo</option>
        <option value="visible">visible</option>
      </select>
    </div>
    <div>
      <label for="hideExploreTabSidebar">hideExploreTabSidebar</label>
      <input
        type="checkbox"
        name="hideExploreTabSidebar"
        id="hideExploreTabSidebar"
        v-model="youtubeState.hideExploreTabSidebar"
      />
    </div>
    <div>
      <label for="grayNotificationCount">grayNotificationCount</label>
      <input
        type="checkbox"
        name="grayNotificationCount"
        id="grayNotificationCount"
        v-model="youtubeState.grayNotificationCount"
      />
    </div>
    <div>
      <label for="hideCommentsSection">hideCommentsSection</label>
      <input
        type="checkbox"
        name="hideCommentsSection"
        id="hideCommentsSection"
        v-model="youtubeState.hideCommentsSection"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { defineComponent } from 'vue';

import { youtubeSettings } from '../interventions/youtube/types';

export default defineComponent({
  name: 'App',
  setup() {
    const youtubeState = reactive<youtubeSettings>({
      homeRecommendationsState: 'visible',
      homeRecommendationsToShow: 20,
      hideHomeFeedFilterBar: false,
      previewsState: 'visible',
      hideExploreTabSidebar: false,
      grayNotificationCount: false,
      hideCommentsSection: false,
    });
    return { youtubeState };
  },
});
</script>
