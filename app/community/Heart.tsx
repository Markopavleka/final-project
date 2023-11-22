import React from 'react';
import { getLikeWhereIdsMatch } from '../../database/likes';
import { filledHeart, outlinedHeart } from '../Components/icons';

type Props = {
  userId: number;
  postId: number;
};

export default async function Heart(props: Props) {
  console.log(props);

  const like = await getLikeWhereIdsMatch(props.userId, props.postId);

  if (like.length > 0) {
    return <button>{filledHeart}</button>;
  } else {
    return <button>{outlinedHeart}</button>;
  }
}
