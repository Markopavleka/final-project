'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateBio(props: {
  username: string;
  profilePicture: string;
  userId: number;
  backgroundPicture: string;
}) {
  const [bio, setBio] = useState('');
  const router = useRouter();
  const userId = props.userId;

  async function handleCreateBio() {
    await fetch('/api/bio', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        bio,
      }),
    });
    setBio('');
    router.refresh();
    router.push('/profile');
  }
  return (
    <div>
      <p className=" ml-4 text-md text-center">Create your biography</p>
      <p className=" ml-4 text-md ">Profile Preview:</p>
      <div className="card frosted h-96">
        <div className="card frosted w-full h-64 bg-[#545454b2]">
          <img
            src={props.backgroundPicture}
            alt=""
            className="w-full h-72 rounded-xl overflow-hidden"
          />
        </div>
        <div className="avatar rounded-full w-52 h-52 bg-[#545454b2] absolute bottom-4 left-16">
          <img
            className="avatar rounded-full w-52 h-52 "
            src={props.profilePicture}
            alt=""
          />
        </div>
        <p className=" ml-4 text-md text-center mt-2">
          {props.username.toUpperCase()}
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await handleCreateBio();
          }}
          className="grid justify-center"
        >
          <label>
            <textarea
              onChange={(event) => {
                setBio(event.currentTarget.value);
              }}
              className="frosted textarea resize-none p-2 my-1 h-20 w-[230%]"
              placeholder="Say something about you"
              required
            />
          </label>
          <div>
            <button className="btn btn-primary mt-8">Set Bio</button>
          </div>
        </form>
      </div>
    </div>
  );
}
