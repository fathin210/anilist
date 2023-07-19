export interface Title {
    english: string
    native: string
    romaji: string
    userPreferred: string
}

export interface Media {
    averageScore: number
    bannerImage: string
    description: string
    episodes: number
    genres: string[]
    id: number
    status: string
    title: Title,
    coverImage: {
        color: string
        extraLarge: string
        large: string
        medium: string
    }
    season?: string
    seasonYear?: number | string
    type: string
    source: string
}

export interface Page {
    pageInfo: {
        total: number,
        perPage: number,
        currentPage: number,
        lastPage: number,
        hasNextPage: boolean
    },
    media: Media[]
}

export interface ListAnimeData {
    Page: Page
}

export interface DetailAnimeData {
    Media: Media
}