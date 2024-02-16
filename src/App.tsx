// import React, { useState } from "react";
// import { Tree } from "./Tree";

// export const RepoInput = () => {
//   const [repoUrl, setRepoUrl] = useState("");
//   const [data, setData] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const response = await fetch("/.netlify/functions/visualize-repo", {
//       method: "POST",
//       body: JSON.stringify({ repoUrl }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();
//     setData(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={repoUrl}
//           onChange={(e) => setRepoUrl(e.target.value)}
//         />
//         <button type="submit">Visualize Repo</button>
//       </form>
//       {data && <Tree data={data} />}
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import { Tree } from "./Tree";

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("repoHistory")) || []
  ); // Get history from localStorage
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("repoFavorites")) || []
  ); // Get favorites from localStorage

  useEffect(() => {
    // Store history and favorites in localStorage whenever they change
    localStorage.setItem("repoHistory", JSON.stringify(history));
    localStorage.setItem("repoFavorites", JSON.stringify(favorites));
  }, [history, favorites]);

  const handleFavorite = (repoUrl) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(repoUrl)) {
        // If the repo is already a favorite, remove it from favorites
        return prevFavorites.filter((url) => url !== repoUrl);
      } else {
        // If the repo is not a favorite, add it to favorites
        return [repoUrl, ...prevFavorites];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset the error state

    // Validate the URL
    try {
      new URL(repoUrl);
    } catch (_) {
      setError("Invalid URL");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch("/.netlify/functions/visualize-repo", {
        method: "POST",
        body: JSON.stringify({ repoUrl }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);

      // Add the repoUrl to the history state
      setHistory((prevHistory) => {
        if (!prevHistory.includes(repoUrl)) {
          return [repoUrl, ...prevHistory];
        } else {
          return prevHistory;
        }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button type="submit">Visualize Repo</button>
      </form>

      {isLoading && <div>Loading...</div>} {/* Display loading message */}
      {error && <div>Error: {error}</div>} {/* Display error message */}
      {data && <Tree data={data} />}

      {/* Display the history */}
      <div>
        <h2>History</h2>
        <ul>
          {history.map((url, index) => (
            <li key={index}>
              {url}
              <button onClick={() => handleFavorite(url)}>
                {favorites.includes(url) ? 'Unfavorite' : 'Favorite'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display the favorites */}
      <div>
        <h2>Favorites</h2>
        <ul>
          {favorites.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;