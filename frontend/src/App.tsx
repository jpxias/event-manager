import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/Auth.context";
import { GraphQLProvider } from "./contexts/GraphQl.context";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <GraphQLProvider>
            <AppRoutes />
          </GraphQLProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
