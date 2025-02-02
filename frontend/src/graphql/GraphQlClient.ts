import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

const getGraphQlClient = () => {
  const client = new GraphQLClient("http://localhost:3000/graphql");
  return getSdk(client);
};

export const GraphQlSdk = getGraphQlClient();
