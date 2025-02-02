import { enqueueSnackbar } from "notistack";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { User } from "../generated/graphql";
import { GraphQlSdk } from "../graphql/GraphQlClient";

interface IAuthContextProps {
  user?: User | null;
  token?: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface IAuthProviderProps extends PropsWithChildren {}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const useAuthContext = (): IAuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorageState<string | null>("token", {});

  const { Login } = GraphQlSdk;

  const navigate = useNavigate();

  const login = (username: string, password: string): void => {
    Login({ username, password })
      .then((res) => {
        setToken(`Bearer ${res.login}`);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error?.response?.errors?.[0]?.message || error.message || "An error occoured, please contact the administrator.";
        enqueueSnackbar(errorMessage, { variant: "warning" });
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
