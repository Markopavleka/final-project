import { UrlObject } from 'node:url';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../database/users';
import { getFetchNews } from '../action';
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

export default async function page(props: Props) {
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

  function findIndex() {
    for (let i = 0; i < dataWithId.length; i++) {
      if (dataWithId[i].id === Number(props.params.newsId)) {
        return i;
      }
    }
    return -1;
  }

  // console.log('check props', props);
  const index = findIndex();

  return (
    <div className="flex justify-center">
      <div className="w-1/2 ml-4 ">
        <div className="card frosted z-[1] my-8">
          <Link href={dataWithId[index].url}>
            <figure>
              <img src={dataWithId[index].urlToImage} alt="" />
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
            <p>{dataWithId[index].publishedAt}</p>
          </div>
          <div className="divider " />
          <div className="divider " />

          <h3 className="mb-1 ml-8 text-md">Comments:</h3>
          <DisplayComments newsId={dataWithId[index].id} />
        </div>
        <CommentNewsForm userId={user.id} newsId={dataWithId[index].id} />
      </div>
    </div>
  );
}
