/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
export type AllRepositoriesOrderBy = "CREATED_AT" | "RATING_AVERAGE"

export type AuthenticateInput = {
  password: string
  username: string
}

export type CreateReviewInput = {
  ownerName: string
  rating: number
  repositoryName: string
  text?: string | undefined
}

export type CreateUserInput = {
  password: string
  username: string
}

export type OrderDirection = "ASC" | "DESC"

export type RepositoryFragmentFragment = {
  __typename: "Repository"
  name: string
  fullName: string
  description: string | null
  language: string | null
  forksCount: number | null
  stargazersCount: number | null
  ratingAverage: number
  reviewCount: number
  ownerAvatarUrl: string | null
  id: string
}

export type AuthenticateMutationVariables = Exact<{
  credentials?: AuthenticateInput | undefined
}>

export type AuthenticateMutation = {
  authenticate: {
    __typename: "AuthenticatePayload"
    accessToken: string
    user: { __typename: "User"; username: string; id: string }
  } | null
}

export type CreateReviewMutationVariables = Exact<{
  review?: CreateReviewInput | undefined
}>

export type CreateReviewMutation = {
  createReview: { __typename: "Review"; repositoryId: string } | null
}

export type CreateUserMutationVariables = Exact<{
  user?: CreateUserInput | undefined
}>

export type CreateUserMutation = {
  createUser: { __typename: "User"; username: string } | null
}

export type RepositoriesQueryVariables = Exact<{
  orderDirection?: OrderDirection | undefined
  orderBy?: AllRepositoriesOrderBy | undefined
  searchKeyword?: string | undefined
}>

export type RepositoriesQuery = {
  repositories: {
    __typename: "RepositoryConnection"
    edges: Array<{
      __typename: "RepositoryEdge"
      node: {
        __typename: "Repository"
        name: string
        fullName: string
        description: string | null
        language: string | null
        forksCount: number | null
        stargazersCount: number | null
        ratingAverage: number
        reviewCount: number
        ownerAvatarUrl: string | null
        id: string
      }
    }>
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  me: { __typename: "User"; username: string; id: string } | null
}

export type RepositoryQueryVariables = Exact<{
  repositoryId: string | number
}>

export type RepositoryQuery = {
  repository: {
    __typename: "Repository"
    url: string | null
    name: string
    fullName: string
    description: string | null
    language: string | null
    forksCount: number | null
    stargazersCount: number | null
    ratingAverage: number
    reviewCount: number
    ownerAvatarUrl: string | null
    id: string
    reviews: {
      __typename: "ReviewConnection"
      edges: Array<{
        __typename: "ReviewEdge"
        node: {
          __typename: "Review"
          id: string
          createdAt: unknown
          rating: number
          text: string | null
          user: { __typename: "User"; id: string; username: string }
        }
      }>
    }
  } | null
}
