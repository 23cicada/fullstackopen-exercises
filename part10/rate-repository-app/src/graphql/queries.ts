import { gql, TypedDocumentNode } from "@apollo/client"
import { REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from "./fragments"
import {
  RepositoriesQuery,
  RepositoriesQueryVariables,
  MeQuery,
  RepositoryQuery,
  RepositoryQueryVariables,
} from "@/types"

export const GET_REPOSITORIES: TypedDocumentNode<
  RepositoriesQuery,
  RepositoriesQueryVariables
> = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

export const ME: TypedDocumentNode<MeQuery> = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
    }
  }
  ${REVIEW_FRAGMENT}
`

export const GET_REPOSITORY: TypedDocumentNode<
  RepositoryQuery,
  RepositoryQueryVariables
> = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      url
      reviews(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
      ...RepositoryFragment
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`
