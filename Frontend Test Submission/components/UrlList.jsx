import React from "react";

function UrlList({ urls }) {
  return (
    <div className="url-list">
      {urls.length === 0 ? (
        <p className="empty">No links yet — start forging!</p>
      ) : (
        urls.map((url, idx) => (
          <div key={idx} className="url-card">
            <a href={url.shortLink} target="_blank" rel="noreferrer">
              {url.shortLink}
            </a>
            <p>Expires at: {new Date(url.expiry).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UrlList;
