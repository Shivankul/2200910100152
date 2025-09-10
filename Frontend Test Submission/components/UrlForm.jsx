import React, { useState } from "react";

function UrlForm({ addUrl }) {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(5);
  const [shortcode, setShortcode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/shorturls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, validity, shortcode })
      });

      const data = await res.json();

      if (res.ok) {
        addUrl(data);
        setUrl("");
        setValidity(5);
        setShortcode("");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        placeholder="Validity (minutes)"
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button type="submit">Forge Link</button>
    </form>
  );
}

export default UrlForm;
