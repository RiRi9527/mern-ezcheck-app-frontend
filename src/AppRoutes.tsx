import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import HomePage from "./pages/HomePage";
import UserProfileAdminPage from "./pages/UserProfileAdminPage";

import ProtectedRoute from "./auth/ProtectedRoute";
import MainPage from "./pages/MainPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile/:userId"
          element={
            <Layout>
              <UserProfileAdminPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
