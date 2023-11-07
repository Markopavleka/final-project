'use client';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { useState } from 'react';

type UploadResult = {
  info: {
    secure_url: string;
  };
  event: string;
};

export default function Upload(props: { userId: number }) {
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  const router = useRouter(); // Initialize the router

  // Extract the user ID from the props
  const userId = props.userId;

  async function handleAddPicture(result: UploadResult) {
    // Update the profilePicture with the result from the upload
    const profilePicture = result.info.secure_url;
    const backgroundPicture = result.info.secure_url;

    // Send a POST request to the API to update the user's profile picture
    await fetch('/api/picture', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        profilePicture,
        backgroundPicture,
      }),
    });

    // Refresh the page or update the user interface as needed
    router.refresh();
  }

  return (
    <div>
      <form>
        <h2>Upload profile Picture</h2>
        <CldUploadButton
          options={{ multiple: false }}
          uploadPreset="my-uploads"
          onUpload={async (profilePicture: UploadResult) => {
            setProfilePictureUrl(profilePicture.info.secure_url);
            // Call the handleAddPicture function to update the user's profile picture
            await handleAddPicture(profilePicture);
          }}
        >
          <span>Upload</span>
        </CldUploadButton>

        <h2>Upload background Picture</h2>
        <CldUploadButton
          options={{ multiple: false }}
          uploadPreset="my-uploads"
          onUpload={async (backgroundPicture: UploadResult) => {
            setBackgroundImageUrl(backgroundPicture.info.secure_url);
            // Call the handleAddPicture function to update the user's profile picture
            await handleAddPicture(backgroundPicture);
          }}
        >
          <span>Upload</span>
        </CldUploadButton>
        <div className="rounded-full">
          <CldImage
            className=""
            alt=""
            src={backgroundImageUrl}
            width={500}
            height={500}
          />
        </div>

        <div className="rounded-full">
          <CldImage
            className="rounded-full"
            alt=""
            src={profilePictureUrl}
            width={150}
            height={150}
          />
        </div>
      </form>
    </div>
  );
}
