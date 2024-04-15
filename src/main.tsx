import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { AppContextProvider } from "./content/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </AppContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
