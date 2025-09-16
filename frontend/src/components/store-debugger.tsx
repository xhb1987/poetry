import React from "react";
import { useAppStore } from "../store/app-store";

interface StoreDebuggerProps {
  show?: boolean;
}

const StoreDebugger: React.FC<StoreDebuggerProps> = ({ show = false }) => {
  const state = useAppStore();

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.9)",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "11px",
        maxWidth: "350px",
        maxHeight: "500px",
        overflow: "auto",
        zIndex: 9999,
        fontFamily: "monospace",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#00ff00" }}>Store Debug</h4>
      <div>
        <strong>Current View:</strong> {state.currentView}
      </div>
      <div>
        <strong>Poetry Count:</strong> {state.poetry.length}
      </div>
      <div>
        <strong>Search Results:</strong> {state.searchResults.length}
      </div>
      <div>
        <strong>Has Searched:</strong> {state.hasSearched ? "Yes" : "No"}
      </div>
      <div>
        <strong>Search Loading:</strong> {state.isSearchLoading ? "Yes" : "No"}
      </div>
      <div>
        <strong>Loading:</strong> {state.isLoading ? "Yes" : "No"}
      </div>
      <div>
        <strong>Modal Open:</strong> {state.isModalOpen ? "Yes" : "No"}
      </div>
      <div>
        <strong>Daily Poetry:</strong>{" "}
        {state.dailyPoetry ? "Available" : "None"}
      </div>

      {state.searchResults.length > 0 && (
        <div
          style={{
            marginTop: "10px",
            borderTop: "1px solid #333",
            paddingTop: "10px",
          }}
        >
          <strong>First Search Result:</strong>
          <div style={{ fontSize: "10px", marginLeft: "10px" }}>
            <div>ID: {state.searchResults[0].id}</div>
            <div>
              Title: {state.searchResults[0].title?.substring(0, 20)}...
            </div>
            <div>Chapter: {state.searchResults[0].chapter}</div>
          </div>
        </div>
      )}

      {state.error && (
        <div style={{ color: "#ff6666", marginTop: "10px" }}>
          <strong>Error:</strong> {state.error}
        </div>
      )}

      {state.searchError && (
        <div style={{ color: "#ff6666", marginTop: "10px" }}>
          <strong>Search Error:</strong> {state.searchError}
        </div>
      )}
    </div>
  );
};

export default StoreDebugger;
