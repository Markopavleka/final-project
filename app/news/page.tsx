import { UrlObject } from 'node:url';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import { getFetchNews } from './action';
import HandleLike from './handleLikeNews';
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
  return (
    <div className="grid grid-cols-3 gap-16 mx-32 mt-16">
      {dataWithId.map((news: News) => (
        <div className="card frosted overflow-hidden" key={`data-${news.id}`}>
          <Link href={news.url}>
            <figure>
              <img src={news.urlToImage} alt="" />
            </figure>
            <div className="frosted rounded-none m-0 p-2">
              <h1 className="text-lg hover:underline">{news.title}</h1>
              <h2 className="text-sm ">{news.author}</h2>
            </div>
          </Link>

          <div className="m-0 p-2">
            <p>{news.description}</p>
            <p>{news.publishedAt}</p>
          </div>
          <div className="flex flex-row">
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
        </div>
      ))}
    </div>
  );
}
