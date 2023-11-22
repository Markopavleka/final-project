import React from 'react';
import { getLikeNewsWhereIdsMatch } from '../../database/likenews';
import { filledHeart, outlinedHeart } from '../Components/icons';

type Props = {
  userId: number;
  newsId: number;
};

export default async function Heart(props: Props) {
  console.log(props);

  const like = await getLikeNewsWhereIdsMatch(props.userId, props.newsId);

  if (like.length > 0) {
    return <button>{filledHeart}</button>;
  } else {
    return <button>{outlinedHeart}</button>;
  }
}
