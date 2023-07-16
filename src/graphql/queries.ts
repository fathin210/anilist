import { gql } from "@apollo/client";

export const GET_ANIME = gql`
  query Page($page: Int) {
    Page(page: $page, perPage: 15) {
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
      }
    }
  }
`;
