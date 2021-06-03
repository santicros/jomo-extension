import {
  distractingElementsProfilesNames,
  DistractingElementsSettings,
  metricsProfilesNames,
  MetricsSettings,
  recommendationProfilesNames,
  RecommendationsSettings,
  YoutubeSettings,
} from './types';

export const profileRecommendations: Record<
  recommendationProfilesNames,
  RecommendationsSettings
> = {
  visible: {
    recommendationsHomeState: 'visible',
    recommendationsHomeLimitedNum: undefined,
    hideRecommendedSidePanelVideo: false,
    hideRecommendationsBottomVideo: false,
    hideEndingVideoCards: false,
    hideEndingVideoRecommendedGrid: false,
  },
  limited: {
    recommendationsHomeState: 'limited',
    recommendationsHomeLimitedNum: 4,
    hideRecommendedSidePanelVideo: true,
    hideRecommendationsBottomVideo: true,
    hideEndingVideoCards: true,
    hideEndingVideoRecommendedGrid: true,
  },
  hidden: {
    recommendationsHomeState: 'hidden',
    recommendationsHomeLimitedNum: undefined,
    hideRecommendedSidePanelVideo: true,
    hideRecommendationsBottomVideo: true,
    hideEndingVideoCards: true,
    hideEndingVideoRecommendedGrid: true,
  },
} as const;

export const profileMetrics: Record<metricsProfilesNames, MetricsSettings> = {
  visible: {
    metricsHideViewCount: false,
    metricsHideLikesDislikes: false,
    metricsHideSubscribersCount: false,
  },
  hidden: {
    metricsHideViewCount: true,
    metricsHideLikesDislikes: true,
    metricsHideSubscribersCount: true,
  },
} as const;

export const profileDistractingElements: Record<
  distractingElementsProfilesNames,
  DistractingElementsSettings
> = {
  visible: {
    hideHomeFeedFilterBar: false,
    previewsState: 'visible',
    hideExploreTabSidebar: false,
    grayNotificationCount: false,
    hideCommentsSection: false,
  },
  limited: {
    hideHomeFeedFilterBar: false,
    previewsState: 'hoverVideo',
    hideExploreTabSidebar: true,
    grayNotificationCount: true,
    hideCommentsSection: false,
  },
  hidden: {
    hideHomeFeedFilterBar: true,
    previewsState: 'hidden',
    hideExploreTabSidebar: true,
    grayNotificationCount: true,
    hideCommentsSection: true,
  },
} as const;

export const profiles = {
  profileRecommendations,
  profileMetrics,
  profileDistractingElements,
} as const;

export const defaultYouTubeConfig: YoutubeSettings = {
  isActive: false,
  profileRecommendations: 'limited',
  profileMetrics: 'hidden',
  profileDistractingElements: 'limited',
} as const;
