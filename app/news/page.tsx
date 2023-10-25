import Link from 'next/link';
import { getFetchNews } from './action';

export default async function MyComponent() {
  const data = await getFetchNews();
  console.log(data);
  return (
    <div>
      {data.articles.map((e) => (
        <div key={`data-${e.title}`}>
          <h1>{e.title}</h1>
          <h2>{e.author}</h2>
          <img src={e.urlToImage} height={300} width={300} alt="" />
          <Link href={e.url}>{e.url}</Link>
          <p>{e.description}</p>
        </div>
      ))}
    </div>
  );
}
