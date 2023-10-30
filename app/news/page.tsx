import { UrlObject } from 'node:url';
import Link from 'next/link';
import { getFetchNews } from './action';

type News = {
  id: string;
  title: string;
  author: string;
  urlToImage: string;
  url: UrlObject;
  description: string;
  publishedAt: string;
};

export default async function MyComponent() {
  const data = await getFetchNews();
  return (
    <div className="my-auto flex justify-center items-center flex-col ">
      {data.articles.map((news: News) => (
        <div
          className="card frosted z-[1] mx-auto my-8 w-1/2 overflow-hidden"
          key={`data-${news.id}`}
        >
          <Link href={news.url}>
            <figure>
              <img src={news.urlToImage} alt="" />
            </figure>
            <div className="frosted rounded-none m-0 p-2">
              <h1 className="text-xl hover:underline">{news.title}</h1>
              <h2 className="text-sm ">{news.author}</h2>
            </div>
          </Link>

          <div className="m-0 p-2">
            <p>{news.description}</p>
            <p>{news.publishedAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
