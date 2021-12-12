import "./styles/etc.css";
import "./styles/main.sass";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Timeline from "./components/pages/Timeline";
import Attribution from "./components/pages/Attribution";
import Admin from "./components/pages/Admin";
import Glossary from "./components/pages/Glossary";
import WhatIsWeb3 from "./components/pages/WhatIsWeb3";
import Suggest from "./components/pages/Suggest";

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
          <Route index element={<Timeline />} />
          <Route path="/attribution" element={<Attribution />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/what" element={<WhatIsWeb3 />} />
          <Route path="/suggest" element={<Suggest />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
