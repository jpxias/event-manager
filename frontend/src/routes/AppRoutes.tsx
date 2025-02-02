import { Route, Routes } from "react-router-dom";
import EventManagerScreen from "../screens/eventManager/EventManager.screen";
import LoginScreen from "../screens/login/Login.screen";
import NotFoundScreen from "../screens/notFound/NotFound.screen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EventManagerScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default AppRoutes;
