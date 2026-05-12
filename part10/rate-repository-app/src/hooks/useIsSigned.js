const { useQuery } = require("@apollo/client/react")
const { ME } = require("../graphql/queries")

const useIsSigned = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { isSigned: !!data?.me, loading };
}

export default useIsSigned;
