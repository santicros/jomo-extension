<template>
  <h1 class="text-5xl text-red-200">Hola</h1>
  <form action="">
    <div>
      <label for="homeRecommendationsState">homeRecommendationsState</label>
      <select name="homeRecommendationsState" id="homeRecommendationsState">
        <option value="hidden">Hidden</option>
        <option value="limited" selected>Limited</option>
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
        value="20"
      />
    </div>
    <div>
      <label for="hideHomeFeedFilterBar">hideHomeFeedFilterBar</label>
      <input
        type="checkbox"
        name="hideHomeFeedFilterBar"
        id="hideHomeFeedFilterBar"
      />
    </div>
    <div>
      <label for="previewsState">previewsState</label>
      <select name="previewsState" id="previewsState">
        <option value="hidden">hidden</option>
        <option value="hoverImg" selected>hoverImg</option>
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
      />
    </div>
    <div>
      <label for="grayNotificationCount">grayNotificationCount</label>
      <input
        type="checkbox"
        name="grayNotificationCount"
        id="grayNotificationCount"
      />
    </div>
    <div>
      <label for="hideCommentsSection">hideCommentsSection</label>
      <input
        type="checkbox"
        name="hideCommentsSection"
        id="hideCommentsSection"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>