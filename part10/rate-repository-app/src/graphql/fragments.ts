import { gql } from "@apollo/client"

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
`

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
    id
    createdAt
    rating
    text
    user {
      id
      username
    }
    repositoryId
  }
`
