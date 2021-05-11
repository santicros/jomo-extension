import { youtubeSettings } from './types';

export const defaultYouTubeConfig: youtubeSettings = {
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
