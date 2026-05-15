import { gql } from "@apollo/client";

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    name
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    id
  }
`;
