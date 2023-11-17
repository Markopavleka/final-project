/* import { getLikeNewsWhereIdsMatch } from '../../database/likenews';
import HandleLike from './handleLikeNews';

export default async function LikeHeart(userId: number, newsId: number) {
  const likeHeart = await getLikeNewsWhereIdsMatch(userId, newsId);
  const checkLikeStatus = likeHeart.length > 0;
  return (
    <div>
      {checkLikeStatus ? filledHeart : outlinedHeart}
      <HandleLike userId={userId} newsId={newsId} />
    </div>
  );
}
 */
