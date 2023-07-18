import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query Page($page: Int) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        status
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        popularity
        averageScore
        episodes
        genres
        status
        description
      }
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query Media($id: Int) {
    Media(id: $id){
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      status
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      popularity
      averageScore
      episodes
      genres
      status
      description
      season
      seasonYear
    }
  }
`