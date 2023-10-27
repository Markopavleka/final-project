export async function getFetchNews() {
  const response = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json',
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return response.json();
}