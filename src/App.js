import "./styles/etc.css";
import "./styles/main.sass";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Timeline from "./components/pages/Timeline";
import Attribution from "./components/pages/Attribution";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route index exact element={<Timeline />} />
          <Route path="/attribution" element={<Attribution />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
