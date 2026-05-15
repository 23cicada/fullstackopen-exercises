import { RepositoryQuery } from "./__generated__/graphql";

type Reviews = NonNullable<RepositoryQuery["repository"]>["reviews"];

type Review = NonNullable<Reviews["edges"][number]["node"]>;

type ReviewFormValues = {
  ownerName: string;
  name: string;
  rating: string;
  review: string;
};

type SignInFormValues = {
  username: string;
  password: string;
};

type SignUpFormValues = SignInFormValues;

export {
  Review,
  Reviews,
  ReviewFormValues,
  SignInFormValues,
  SignUpFormValues,
};
export * from "./__generated__/graphql";
