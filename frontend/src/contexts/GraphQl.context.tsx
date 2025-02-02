import { enqueueSnackbar } from "notistack"; // MUI Snackbar for alerts
import { createContext, PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Auth.context"; // Your Auth context

interface GraphQLContextType {
  graphqlRequest: <T>(
    queryFunction: (variables: any, headers: any) => Promise<T>,
    variables: any,
    isAuth: boolean,
    successMessage?: string | undefined
  ) => Promise<T | null>;
}

interface IGraphQlProviderProps extends PropsWithChildren {}

const GraphQLContext = createContext<GraphQLContextType | undefined>(undefined);

export const GraphQLProvider = ({ children }: IGraphQlProviderProps) => {
  const { token, logout } = useAuthContext();
  const navigate = useNavigate();

  const graphqlRequest = async <T,>(
    queryFunction: (variables: any, headers: any) => Promise<T>,
    variables: any = {},
    isAuth: boolean,
    successMessage: string | undefined
  ): Promise<T | null> => {
    try {
      let headers = {};

      if (isAuth) {
        headers = { Authorization: token };
      }

      const response = await queryFunction(variables, headers);

      if (successMessage) {
        enqueueSnackbar(successMessage, { variant: "success", autoHideDuration: 2000 });
      }

      return response;
    } catch (error: any) {
      const errorMessage = error?.response?.errors?.[0]?.message || error.message;

      if (error?.response?.errors?.[0]?.extensions.code === "UNAUTHENTICATED") {
        logout();
        navigate("/login");
        enqueueSnackbar("Session expired. Logging out.", { variant: "warning", autoHideDuration: 2000 });
      } else if (error?.response?.errors?.[0]?.extensions.status === 404) {
        navigate("/not-found");
      } else if (errorMessage) {
        enqueueSnackbar(errorMessage, { variant: "warning", autoHideDuration: 2000 });
      } else {
        enqueueSnackbar("An error occoured, please contact the administrator.", { variant: "error", autoHideDuration: 2000 });
      }

      throw error;
    }
  };

  return <GraphQLContext.Provider value={{ graphqlRequest }}>{children}</GraphQLContext.Provider>;
};

export const useGraphQL = (): GraphQLContextType => {
  const context = useContext(GraphQLContext);
  if (!context) {
    throw new Error("useGraphQL must be used within a GraphQLProvider");
  }
  return context;
};
