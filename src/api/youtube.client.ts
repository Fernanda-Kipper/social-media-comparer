import { google , youtube_v3 } from 'googleapis'

const API_KEY = process.env['YT_API_KEY'];
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env["YT_API_KEY"],
}) as youtube_v3.Youtube;


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

export async function searchChannels(
    query: string,
    maxResults = 5
  ): Promise<ResourceInfo[]> {
    const res = await youtube.search.list({
      part: ['snippet', 'id'],
      q: query,
      maxResults,
      type: ['channel'],
    });
  
    if (!res.data.items) {
      return [];
    }
  
    return res.data.items as ResourceInfo[];
}

export async function getChannelDetails(channelId: string){
    const res = await youtube.channels.list({
        part: ['snippet', 'statistics', 'brandingSettings'],
        id: [channelId],
    });

    // TODO: RETURN 3 RECENT VIDEOS
    const videosResponse = await youtube.activities.list({
        channelId: channelId,
        part: ['snippet', 'contentDetails']
    })

    if (!res.data.items) {
        return [];
    }
    const channelInfo = res.data.items[0];
    return channelInfo as ChannelInfo;
}