import { UrlObject } from 'node:url';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import { transformDateFormat } from '../Components/DateConverter';
import { getFetchNews } from './action';
import HandleLike from './handleLikeNews';
import ScrollAnimation from './scrollAnimationNews';
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

export const metadata = {
  title: 'TechNewZ|| News',
  description:
    'Stay ahead of the curve with TechNewZ, your source for the latest in the ever in the ever-evolving world of technology. At TechNewZ we pride ourselves on delivering unbiased and objective news coverage, ensuring you get an accurate and balanced insight into the fast-paced the fast-paced technology landscape.',
};

export default async function NewsPage() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/signin');

  const data = await getFetchNews();

  const dataWithId = data.articles.map((item: News, index: number) => ({
    ...item,
    id: index + 1,
  }));

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
                className=" h-80 object-cover "
              />
            </figure>
            <div className="frosted rounded-none m-0 p-2">
              <h1 className="text-lg font-bold hover:underline">
                {news.title}
              </h1>
              <h2 className="text-sm">{news.author}</h2>
            </div>
          </Link>

          <div className="m-0 p-2 flex flex-col h-44">
            <div>
              <p>{news.description}</p>
            </div>
            <p className="m-0 p-2 mb-0 mt-auto">
              {transformDateFormat(news.publishedAt)}
            </p>
          </div>
          <div className="divider m-0" />
          <div className="flex items-center justify-center my-1 ">
            <div className="mx-4">
              <ShowCommentsNewsCount newsId={news.id} />
            </div>
            <div className="mr-4">
              <Link
                className="mr-4 hover:underline hover:scale-110"
                href={`/news/${news.id}`}
              >
                Comment
              </Link>
            </div>
            <div className="mx-4">
              <ShowLike postId={news.id} />
            </div>
            <div className="mr-4">
              <HandleLike userId={user.id} newsId={news.id} />
            </div>
          </div>
        </ScrollAnimation>
      ))}
      <div className="mb-32" />
    </div>
  );
}
