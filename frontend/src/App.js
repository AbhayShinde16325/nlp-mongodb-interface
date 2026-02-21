import React, { useState } from "react";
import { sendQuery } from "./api";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!query.trim() || loading) return;


    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const data = await sendQuery(query);
      setResponse(data);
    } catch (err) {
      setError("Could not process query. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="title">Natural Language MongoDB Interface</div>
      <div className="subtitle">
        Try: "users in mumbai limit 3", "average salary in mumbai", "count users in delhi"
      </div>

      <div className="input-row">
       <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
         if (e.key === "Enter") {
          handleSubmit();
          }
        }}
        placeholder="Enter your query..."
        className="input-field"
      />


        <button
          onClick={handleSubmit}
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      {error && <div className="error-text">{error}</div>}

      {response && (
        <>
          <div className="interpretation">
            <strong>Interpretation:</strong> {response.interpretation}
          </div>

          {response.result !== undefined && (
            <div className="result-number">
              Result: {response.result}
            </div>
          )}

          {response.results && response.results.length > 0 && (
            <table className="result-table">
              <thead>
                <tr>
                  {Object.keys(response.results[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.results.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default App;
