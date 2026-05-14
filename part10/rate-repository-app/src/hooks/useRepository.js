import { GET_REPOSITORY } from '../graphql/queries'
import { useQuery } from '@apollo/client/react';

const useRepository = ({ repositoryId }) => {
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId }
  });

  return { repository: data?.repository, loading };
};

export default useRepository;
