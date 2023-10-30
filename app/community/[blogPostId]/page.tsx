import React from 'react';
import { getBlogPostsById } from '../../../database/users';

type Props = {
  params: {
    postId: number;
  };
};

export default async function BlogPostPage(props: Props) {
  const singleBlogPost = await getBlogPostsById(props.params.postId);
  console.log(singleBlogPost);
  return (
    <div className="flex justify-center">
      <div className=" w-1/2 ml-4">
        <div className="card frosted z-[1] my-8">
          <div>
            <h2 className="text-xl text-center my-4">
              {singleBlogPost.username}
            </h2>
            <h3 className="mb-1 ml-8 text-md">Title:</h3>
            <p className="card frosted mb-1 mx-4 text-md p-4">
              {singleBlogPost.title}
            </p>
            <h3 className="mb-1 ml-8 text-md ">Description:</h3>
            <p className="card frosted my-4 mx-4 text-md p-4">
              {singleBlogPost.post}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
