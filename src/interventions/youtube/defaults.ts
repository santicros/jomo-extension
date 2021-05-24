import { youtubeSettings } from './types';

export const defaultYouTubeConfig: youtubeSettings = {
  profileRecommendations: 'hidden',
  profilelMetrics: 'visible',
  profileDistractingElements: 'hidden',

  recommendationsHomeState: 'limited',
  recommendationsHomeLimitedNum: 4,
  hideRecommendedSidePanelVideo: true,
  hideRecommendationsBottomVideo: true,
  hideEndingVideoCards: true,
  hideEndingVideoRecommendedGrid: true,

  metricsHideViewCount: true,
  metricsHideLikesDislikes: true,
  metricsHideSubscribersCount: true,

  hideHomeFeedFilterBar: true,
  previewsState: 'hidden',
  hideExploreTabSidebar: true,
  grayNotificationCount: true,
  hideCommentsSection: true,
};
