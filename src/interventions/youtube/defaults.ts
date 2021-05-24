import { youtubeSettings } from './types';

export const defaultYouTubeConfig: youtubeSettings = {
  profileRecommendations: undefined,
  profileMetrics: undefined,
  profileDistractingElements: undefined,

  recommendationsHomeState: undefined,
  recommendationsHomeLimitedNum: undefined,
  hideRecommendedSidePanelVideo: undefined,
  hideRecommendationsBottomVideo: undefined,
  hideEndingVideoCards: undefined,
  hideEndingVideoRecommendedGrid: undefined,

  metricsHideViewCount: undefined,
  metricsHideLikesDislikes: undefined,
  metricsHideSubscribersCount: undefined,

  hideHomeFeedFilterBar: undefined,
  previewsState: undefined,
  hideExploreTabSidebar: undefined,
  grayNotificationCount: undefined,
  hideCommentsSection: undefined,
};

export const profileYoutubeConfig: youtubeSettings = {
  profileRecommendations: 'hidden',
  profileMetrics: 'visible',
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
