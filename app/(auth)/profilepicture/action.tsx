import { useRouter } from 'next/navigation';
import React from 'react';

export default function DatabaseHandler(props: {
  userId: number;
  profilePicture: string | undefined;
}) {
  const router = useRouter();
  const userId = props.userId;
  const profilePicture = props.profilePicture;

  async function handleAddPicture() {
    await fetch('/api/picture', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        profilePicture,
      }),
    });
    router.refresh();
  }
  console.log('checking props ', userId);

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleAddPicture();
        }}
      >
        <button className="ml-2">Change Profile</button>
      </form>
    </div>
  );
}
