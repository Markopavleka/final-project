'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CreateBlogPostForm({ userId }: { userId: number }) {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const router = useRouter();

  async function handleCreateBlogPost() {
    await fetch('/api/blogpost', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        title,
        post,
      }),
    });
    setTitle('');
    setPost('');
    router.refresh();
  }

  return (
    <div className="flex justify-center">
      <div className="card frosted z-[1] w-1/2 ml-4">
        <h1 className="text-2xl text-center my-4">Create a Post:</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await handleCreateBlogPost();
          }}
          className="mx-24"
        >
          <label>
            <p className="mb-1 ml-4 text-md">Title:</p>
            <input
              onChange={(event) => {
                setTitle(event.currentTarget.value);
              }}
              className="frosted p-2 mt-1 mb-2 w-full"
              placeholder="Ask a question or add a title"
              required
            />
          </label>
          <label>
            <p className="mb-1 ml-4 text-md">Text:</p>
            <textarea
              onChange={(event) => {
                setPost(event.currentTarget.value);
              }}
              className="frosted resize-none  p-2 mt-1 mb-2 w-full h-40"
              placeholder="Provide some more information"
              required
            />
          </label>

          <button className="btn btn-md btn-primary text-white mx-auto my-4 px-6">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
