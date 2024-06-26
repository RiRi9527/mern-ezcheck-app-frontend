import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./auth/ProtectedRoute";
import MainPage from "./pages/MainPage";
import TransferPage from "./pages/TransferPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/main/:userId" element={<MainPage />} />
      </Route>
      <Route path="/transfer/:userId" element={<TransferPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
