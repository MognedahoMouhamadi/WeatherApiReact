export async function testGeo() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=Par&limit=5&appid=${import.meta.env.VITE_API_KEY}`
    );
    const data = await res.json();
    console.log("GEO TEST:", res.status, data);
  } catch (e) {
    console.error("GEO TEST ERROR:", e);
  }
}

