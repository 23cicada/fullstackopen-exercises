import { View, StyleSheet } from "react-native";
import theme from "../../theme";
import * as yup from "yup";
import { useFormik } from "formik";
import TextInput from "../TextInput";
import Button from "../Button";
import useReview from "../../hooks/useReview";
import Text from "../Text";
import { ReviewFormValues } from "@/types";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  name: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .integer("Rating must be an integer")
    .min(0, "Rating must be greater than 0")
    .max(100, "Rating must be less than 100"),
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white,
    rowGap: 20,
  },
});

const ReviewForm = () => {
  const { createReview, result } = useReview();
  const error = result.error?.message;
  const formik = useFormik<ReviewFormValues>({
    initialValues: {
      ownerName: "",
      name: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => await createReview(values),
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        error={formik.touched.ownerName && formik.errors.ownerName}
      />
      <TextInput
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={formik.touched.name && formik.errors.name}
      />
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        error={formik.touched.rating && formik.errors.rating}
      />
      <TextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        onBlur={formik.handleBlur("review")}
        error={formik.touched.review && formik.errors.review}
        multiline
        numberOfLines={4}
      />
      <Button onPress={() => formik.handleSubmit()}>Create a review</Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
};

export default ReviewForm;
