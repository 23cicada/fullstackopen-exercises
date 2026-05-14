import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "../RepositoryItem";
import * as Linking from "expo-linking";
import ReviewList from "./ReviewList";
import Button from "../Button";

const RepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository({ repositoryId: id });

  return (
    <>
      <RepositoryItem {...repository}>
        <Button
          style={{ marginTop: 16 }}
          onPress={() => Linking.openURL(repository.url)}
        >
          Open in GitHub
        </Button>
      </RepositoryItem>
      <ReviewList reviews={repository?.reviews} />
    </>
  );
};

export default RepositoryView;
