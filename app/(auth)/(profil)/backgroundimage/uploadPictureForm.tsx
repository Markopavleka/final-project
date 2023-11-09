'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function UploadPictureForm(props: {
  username: string;
  profilePicture: string;
  userId: number;
}) {
  const router = useRouter();
  const userId = Number(props.userId);

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (onLoadEvent.target) {
        setImageSrc(onLoadEvent.target.result as string);
      }
    };

    if (changeEvent.target.files && changeEvent.target.files[0]) {
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  }

  async function handleOnSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const fileInput = form.elements.namedItem(
      'file',
    ) as HTMLInputElement | null;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);
      formData.append('upload_preset', 'my-uploads');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/nebulanexus-7sky/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );

        if (response.ok) {
          const data = await response.json();
          setImageSrc(data.secure_url);

          const backgroundPicture = data.secure_url;

          if (backgroundPicture !== undefined) {
            await fetch('/api/backgroundimage', {
              method: 'POST',
              body: JSON.stringify({
                userId,
                backgroundPicture,
              }),
            });
            router.refresh();
            router.push('/bio');
          }
        } else {
          console.error('Failed to upload the file.');
        }
      } catch (error) {
        console.error('An error occurred while uploading the file:', error);
      }
    } else {
      console.error('No file selected for upload.');
    }
  }

  return (
    <div>
      <p className=" ml-4 text-md text-center">Background Picture</p>
      <p className=" ml-4 text-md ">Profile Preview:</p>
      <div className="card frosted h-96">
        <div className="card frosted w-full h-64 bg-[#545454b2]">
          <img
            src={imageSrc}
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
      </div>
      <form
        onSubmit={handleOnSubmit}
        className="grid justify-center align-center justify-items-center"
      >
        <div className="m-8">
          <input
            className="file-input file-input-bordered file-input-primary w-full max-w-xs my-2"
            type="file"
            name="file"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <button className="btn btn-primary m-4 ">Set Picture</button>
        </div>
      </form>
    </div>
  );
}
