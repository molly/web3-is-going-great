import "./styles/main.sass";

import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import Timeline from "./components/pages/Timeline";
import About from "./components/pages/About";
import Attribution from "./components/pages/Attribution";
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

  ReactGA.initialize("UA-215114522-1");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route index element={<Timeline />} />
          <Route path="/about" element={<About />} />
          <Route path="/attribution" element={<Attribution />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/what" element={<WhatIsWeb3 />} />
          <Route path="/suggest" element={<Suggest />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
