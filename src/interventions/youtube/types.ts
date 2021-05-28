export type RecommendationsSettings = {
  recommendationsHomeState?: 'visible' | 'limited' | 'hidden';
  recommendationsHomeLimitedNum?: number;
  hideRecommendedSidePanelVideo?: boolean;
  hideRecommendationsBottomVideo?: boolean;
  hideEndingVideoCards?: boolean;
  hideEndingVideoRecommendedGrid?: boolean;
};

export type MetricsSettings = {
  metricsHideViewCount?: boolean;
  metricsHideLikesDislikes?: boolean;
  metricsHideSubscribersCount?: boolean;
};

export type DistractingElementsSettings = {
  hideHomeFeedFilterBar?: boolean;
  previewsState?: 'visible' | 'hoverVideo' | 'hoverImg' | 'hidden';
  hideExploreTabSidebar?: boolean;
  grayNotificationCount?: boolean;
  hideCommentsSection?: boolean;
};

type recommendationProfilesNames = 'visible' | 'limited' | 'hidden';
type metricsProfilesNames = 'visible' | 'hidden';
type distractingElementsProfilesNames = 'visible' | 'limited' | 'hidden';

export type YoutubeSettings = RecommendationsSettings &
  MetricsSettings &
  DistractingElementsSettings & {
    isActive: boolean;
    profileRecommendations?: recommendationProfilesNames | 'custom';
    profileMetrics?: metricsProfilesNames | 'custom';
    profileDistractingElements?: distractingElementsProfilesNames | 'custom';
  };
