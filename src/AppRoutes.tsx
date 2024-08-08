import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./auth/ProtectedRoute";
import MainPage from "./pages/MainPage";
import PayrollPage from "./pages/PayrollPage";
import { useAppContext } from "./content/AppContext";

const AppRoutes = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <MainPage /> : <HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/:userId/payroll" element={<PayrollPage />} />
      </Route>
      <Route element={<ProtectedRoute />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
