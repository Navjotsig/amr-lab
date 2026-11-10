/*
 * Fetches live content from FastAPI before app.js renders the page.
 * If the API is unavailable, the existing data.js remains as a fallback.
 */
window.AMR_API_READY = (async () => {
  const base = (window.AMR_API_BASE_URL || "").replace(/\/$/, "");
  if (!base) return;

  try {
    const response = await fetch(`${base}/api/content`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`API returned HTTP ${response.status}`);

    const liveData = await response.json();
    if (!liveData || typeof liveData !== "object") {
      throw new Error("API response was not a valid content object");
    }

    window.AMR_DATA = liveData;
    console.info("AMR Lab content loaded from the Python API.");
  } catch (error) {
    console.warn("AMR Lab API unavailable; using bundled data.js fallback.", error);
  }
})();
