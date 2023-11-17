import { UrlObject } from 'node:url';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import { getFetchNews } from './action';
import HandleLike from './handleLikeNews';
import ScrollAnimation from './scrollAnimation';
import ShowCommentsNewsCount from './showCommentsNewsCount';
import ShowLike from './showLike';

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

  function transformDateFormat(apiDate: string) {
    const originalDate = new Date(apiDate);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = originalDate.getFullYear();

    return `${day}.${month}.${year}`;
  }
  return (
    <div className="grid grid-cols-3 gap-16 mx-32 mt-16">
      <Head>
        <meta charSet="utf-8" />
        <title>News| TechNewZ</title>
        <meta name="News" content="News" />
      </Head>
      {dataWithId.map((news: News) => (
        <ScrollAnimation key={`data-${news.id}`}>
          <Link href={news.url} className="flex flex-col">
            <figure>
              <img
                src={news.urlToImage}
                alt={news.title}
                className=" h-80 object-cover"
              />
            </figure>
            <div className="frosted rounded-none m-0 p-2">
              <h1 className="text-lg font-bold hover:underline">
                {news.title}
              </h1>
              <h2 className="text-sm">{news.author}</h2>
            </div>
          </Link>

          <div className="m-0 p-2 ">
            <p>{news.description}</p>

            <p className="m-0 p-2 mb-0 mt-auto">
              {transformDateFormat(news.publishedAt)}
            </p>
          </div>
          <div className="divider mt-0" />
          <div className="flex flex-row items-center">
            <div className="ml-8 mr-2">
              <ShowCommentsNewsCount newsId={news.id} />
            </div>
            <Link className="mr-4 hover:underline" href={`/news/${news.id}`}>
              Comment
            </Link>
            <div>
              <ShowLike postId={news.id} />
            </div>
            <div className="mr-2">
              <HandleLike userId={user.id} newsId={news.id} />
            </div>
          </div>
        </ScrollAnimation>
      ))}
      <div className="mb-32" />
    </div>
  );
}
