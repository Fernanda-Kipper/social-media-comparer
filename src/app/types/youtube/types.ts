export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface ResourceInfo {
    id: {
        kind: string;
        channelId: string;
    },
    snippet: {
        channelId: string;
        channelTitle: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
        }
    }
}

export interface ChannelInfo {
    id: string;
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
        },
        customUrl: string,
        publishedAt: string,
    },
    statistics: {
        viewCount: string,
        subscriberCount: string;
        videoCount: string;
    }
    auditDetails: {
        communityGuidelinesGoodStanding: boolean
    }
    brandingSettings: {
        channel: {
            keywords: string;
        }
    }
}

export interface ComparerInfo {
    channelA: ChannelInfo | null;
    channelB: ChannelInfo | null;
}