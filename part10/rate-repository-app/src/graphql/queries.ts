import { gql, TypedDocumentNode } from "@apollo/client"
import { REPOSITORY_FRAGMENT } from "./fragments"
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
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

export const ME: TypedDocumentNode<MeQuery> = gql`
  query Me {
    me {
      username
      id
    }
  }
`

export const GET_REPOSITORY: TypedDocumentNode<
  RepositoryQuery,
  RepositoryQueryVariables
> = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      url
      reviews {
        edges {
          node {
            id
            createdAt
            rating
            text
            user {
              id
              username
            }
          }
        }
      }
      ...RepositoryFragment
    }
  }
  ${REPOSITORY_FRAGMENT}
`
