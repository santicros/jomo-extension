export type youtubeSettings = {
  // profile
  profileRecommendations:
    | 'hidden'
    | 'limited'
    | 'visible'
    | 'custom'
    | undefined;
  profileMetrics: 'hidden' | 'visible' | 'custom' | undefined;
  profileDistractingElements:
    | 'hidden'
    | 'limited'
    | 'visible'
    | 'custom'
    | undefined;

  // recommendations
  recommendationsHomeState: 'hidden' | 'limited' | 'visible' | undefined;
  recommendationsHomeLimitedNum: number | undefined;
  hideRecommendedSidePanelVideo: boolean | undefined;
  hideRecommendationsBottomVideo: boolean | undefined;
  hideEndingVideoCards: boolean | undefined;
  hideEndingVideoRecommendedGrid: boolean | undefined;

  // metrics
  metricsHideViewCount: boolean | undefined;
  metricsHideLikesDislikes: boolean | undefined;
  metricsHideSubscribersCount: boolean | undefined;

  // distractingElements
  hideHomeFeedFilterBar: boolean | undefined;
  previewsState: 'hidden' | 'hoverImg' | 'hoverVideo' | 'visible' | undefined;
  hideExploreTabSidebar: boolean | undefined;
  grayNotificationCount: boolean | undefined;
  hideCommentsSection: boolean | undefined;
};
