export type youtubeSettings = {
  // profile
  profileRecommendations: 'hidden' | 'limited' | 'visible' | 'custom';
  profilelMetrics: 'hidden' | 'visible' | 'custom';
  profileDistractingElements: 'hidden' | 'limited' | 'visible' | 'custom';

  // recommendations
  recommendationsHomeState: 'hidden' | 'limited' | 'visible';
  recommendationsHomeLimitedNum: number;
  hideRecommendedSidePanelVideo: boolean;
  hideRecommendationsBottomVideo: boolean;
  hideEndingVideoCards: boolean;
  hideEndingVideoRecommendedGrid: boolean;

  // metrics
  metricsHideViewCount: boolean;
  metricsHideLikesDislikes: boolean;
  metricsHideSubscribersCount: boolean;

  // distractingElements
  hideHomeFeedFilterBar: boolean;
  previewsState: 'hidden' | 'hoverImg' | 'hoverVideo' | 'visible';
  hideExploreTabSidebar: boolean;
  grayNotificationCount: boolean;
  hideCommentsSection: boolean;
};
