export async function getFetchNews() {
  const response = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}
