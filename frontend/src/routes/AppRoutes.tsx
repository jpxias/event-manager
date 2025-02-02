import { Route, Routes } from "react-router-dom";
import EventInvitationScreen from "../screens/eventInvitation/EventInvitation.screen";
import EventManagerScreen from "../screens/eventManager/EventManager.screen";
import LoginScreen from "../screens/login/Login.screen";
import NotFoundScreen from "../screens/notFound/NotFound.screen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EventManagerScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/invitation/:id" element={<EventInvitationScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default AppRoutes;
