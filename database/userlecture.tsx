/* import React, { useEffect, useState } from 'react';

async function getData() {
  const response = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result.articles); // Assuming the API response has an 'articles' property
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map((article, index) => (
        <h1 key={`data-${index}`}>{article.title}</h1>
      ))}
    </div>
  );
}
 */
