'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type CommentFormProps = {
  userId: number;
  newsId: number;
};

export default function CommentNewsForm({ userId, newsId }: CommentFormProps) {
  const [comment, setComment] = useState('');

  const router = useRouter();

  async function handleCreateNewsComment() {
    await fetch('/api/commentsnews', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        newsId,
        comment,
      }),
    });
    setComment('');
    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreateNewsComment();
        }}
      >
        <div className="card frosted z-[1] my-8">
          <p className="mb-1 ml-8 mt-8 text-md">Add a comment:</p>
          <input
            onChange={(event) => {
              setComment(event.currentTarget.value);
            }}
            className="card frosted my-4 mx-4 text-md p-4"
          />
          <button className="btn btn-md btn-primary text-white justify-end ml-auto mr-8 my-4 px-6">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
