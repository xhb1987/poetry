const axios = require("axios");

async function testSearch() {
  try {
    console.log("Testing direct API call...");
    const response = await axios.get(
      "http://localhost:3000/poetry/search?q=風"
    );
    console.log("Response status:", response.status);
    console.log("Response data structure:", typeof response.data);
    console.log("Response data keys:", Object.keys(response.data));
    console.log(
      "Results array length:",
      response.data.results ? response.data.results.length : "No results array"
    );
    console.log(
      "First result:",
      response.data.results && response.data.results[0]
        ? response.data.results[0].title
        : "No results"
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testSearch();
