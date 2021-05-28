import {
  DistractingElementsSettings,
  MetricsSettings,
  RecommendationsSettings,
  YoutubeSettings,
} from './types';

const recommendationsProfileHidden: RecommendationsSettings = {
  recommendationsHomeState: 'hidden',
  recommendationsHomeLimitedNum: undefined,
  hideRecommendedSidePanelVideo: true,
  hideRecommendationsBottomVideo: true,
  hideEndingVideoCards: true,
  hideEndingVideoRecommendedGrid: true,
};

const recommendationsProfileLimited: RecommendationsSettings = {
  recommendationsHomeState: 'hidden',
  recommendationsHomeLimitedNum: 4,
  hideRecommendedSidePanelVideo: true,
  hideRecommendationsBottomVideo: true,
  hideEndingVideoCards: true,
  hideEndingVideoRecommendedGrid: true,
};

const metricsProfileHidden: MetricsSettings = {
  metricsHideViewCount: true,
  metricsHideLikesDislikes: true,
  metricsHideSubscribersCount: true,
};

const distractingElementsProfileLimited: DistractingElementsSettings = {
  hideHomeFeedFilterBar: false,
  previewsState: 'hoverVideo',
  hideExploreTabSidebar: true,
  grayNotificationCount: true,
  hideCommentsSection: false,
};

const distractingElementsProfileHidden: DistractingElementsSettings = {
  hideHomeFeedFilterBar: true,
  previewsState: 'hidden',
  hideExploreTabSidebar: true,
  grayNotificationCount: true,
  hideCommentsSection: true,
};

export const recommendationsProfile: Record<string, RecommendationsSettings> = {
  limited: recommendationsProfileLimited,
  hidden: recommendationsProfileHidden,
};

export const metricsProfile: Record<string, MetricsSettings> = {
  hidden: metricsProfileHidden,
};

export const distractingElementsProfile: Record<
  string,
  DistractingElementsSettings
> = {
  limited: distractingElementsProfileHidden,
  hidden: distractingElementsProfileLimited,
};

export const defaultYouTubeConfig: YoutubeSettings = {
  isActive: false,
  profileRecommendations: 'limited',
  profileMetrics: 'hidden',
  profileDistractingElements: 'limited',
};
