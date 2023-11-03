import { UrlObject } from 'node:url';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import { getFetchNews } from './action';

type News = {
  source: { id: string; name: string };
  author: string;
  title: string;
  urlToImage: string;
  url: UrlObject;
  description: string;
  publishedAt: string;
  content: string;
  id: number;
};

export default async function NewsPage() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/');

  const data = await getFetchNews();
  const dataWithId = data.articles.map((item: News, index: number) => ({
    ...item,
    id: index + 1,
  }));
  return (
    <div className="my-auto flex justify-center items-center flex-col ">
      {dataWithId.map((news: News) => (
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
            <Link className="m-8 hover:underline" href={`/news/${news.id}`}>
              Comment
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
