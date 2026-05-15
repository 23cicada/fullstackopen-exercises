import { gql, TypedDocumentNode } from "@apollo/client";
import {
  AuthenticateMutation,
  AuthenticateMutationVariables,
  CreateReviewMutation,
  CreateReviewMutationVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/types";

export const AUTHENTICATE: TypedDocumentNode<
  AuthenticateMutation,
  AuthenticateMutationVariables
> = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        username
        id
      }
    }
  }
`;

export const CREATE_REVIEW: TypedDocumentNode<
  CreateReviewMutation,
  CreateReviewMutationVariables
> = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const CREATE_USER: TypedDocumentNode<
  CreateUserMutation,
  CreateUserMutationVariables
> = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;
