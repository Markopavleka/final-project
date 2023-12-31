import { UrlObject } from 'node:url';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../database/users';
import { transformDateFormat } from '../../Components/DateConverter';
import { getFetchNews } from '../action';
import HandleLike from '../handleLikeNews';
import Heart from '../Heart';
import ShowLike from '../showLike';
import CommentNewsForm from './commentNewsForm';
import DisplayComments from './displayCommentsNews';

type Props = {
  query: string;
  params: {
    newsId: number;
  };
};
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

export default async function page(props: Props) {
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

  function findIndex() {
    for (let i = 0; i < dataWithId.length; i++) {
      if (dataWithId[i].id === Number(props.params.newsId)) {
        return i;
      }
    }
    return -1;
  }

  const index = findIndex();

  return (
    <div className="flex justify-center">
      <Head>
        <meta charSet="utf-8" />
        <title>News| TechNewZ</title>
        <meta name="News" content="News" />
      </Head>
      <div className="w-1/2 ml-4 ">
        <div className="card frosted z-[1] my-8 overflow-hidden">
          <Link href={dataWithId[index].url}>
            <figure>
              <img
                src={dataWithId[index].urlToImage}
                alt={dataWithId[index].title}
              />
            </figure>
            <div className="frosted rounded-none m-0 p-2">
              <h1 className="text-xl hover:underline">
                {dataWithId[index].title}
              </h1>
              <h2 className="text-sm ">{dataWithId[index].author}</h2>
            </div>
          </Link>

          <div className="m-0 p-2">
            <p>{dataWithId[index].description}</p>
            <p>{transformDateFormat(dataWithId[index].publishedAt)}</p>
          </div>
          <div className="divider m-0" />
          <div className="flex items-center justify-start my-1 ml-8">
            <div className="mx-4">
              <ShowLike postId={dataWithId[index].id} />
            </div>
            <div className="mr-2">
              <Heart userId={user.id} newsId={dataWithId[index].id} />
            </div>
            <div>
              <HandleLike userId={user.id} newsId={dataWithId[index].id} />
            </div>
          </div>
          <div className="divider m-0" />

          <h3 className="mb-1 ml-8 text-md">Comments:</h3>
          <DisplayComments newsId={dataWithId[index].id} />
        </div>
        <CommentNewsForm userId={user.id} newsId={dataWithId[index].id} />
      </div>
    </div>
  );
}
