export type youtubeSettings = {
  homeRecommendationsState: 'hidden' | 'limited' | 'visible';
  homeRecommendationsLimitedShowNum: number;
  hideHomeFeedFilterBar: boolean;
  previewsState: 'hidden' | 'hoverImg' | 'hoverVideo' | 'visible';
  hideExploreTabSidebar: boolean;
  grayNotificationCount: boolean;
  hideCommentsSection: boolean;
  hideMetrics: boolean;
  hideMetricsOptions: {
    viewCount: boolean;
    likesAndDislikes: boolean;
    subscribersCount: boolean;
  };
  hideRecommendedSidePanelVideo: boolean;
  hideRecommendationsBottomVideo: boolean;
  hideEndingVideoCards: boolean;
  hideEndingVideoRecommendedGrid: boolean;
};
