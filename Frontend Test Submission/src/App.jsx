import React, { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);

  const addUrl = (newUrl) => {
    setUrls([newUrl, ...urls]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Link Forge 🔗</h1>
        <p>Craft short links with an expiry twist</p>
      </header>

      <UrlForm addUrl={addUrl} />

      <UrlList urls={urls} />
    </div>
  );
}

export default App;
