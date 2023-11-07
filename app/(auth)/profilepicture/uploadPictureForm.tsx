'use client';
import { useState } from 'react';
import DatabaseHandler from './action';

export default function UploadPictureForm(props: { userId: number }) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [uploadData, setUploadData] = useState<string | undefined>(undefined);

  console.log('checking props ', props);

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (onLoadEvent.target) {
        setImageSrc(onLoadEvent.target.result as string);
        setUploadData(undefined);
      }
    };

    if (changeEvent.target.files && changeEvent.target.files[0]) {
      reader.readAsDataURL(changeEvent.target.files[0]);
      console.log(changeEvent.target.files[0]);
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
          setUploadData(data);
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
      <form
        method="post"
        onSubmit={handleOnSubmit}
        className="grid justify-center align-center justify-items-center"
      >
        <p className="mb-1 ml-4 text-md">Profile Picture</p>

        <div className="m-4">
          <input
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            type="file"
            name="file"
            onChange={handleOnChange}
          />
        </div>

        <div className="avatar rounded-full w-52 h-52 bg-[#545454b2]">
          <img className="rounded-full" src={imageSrc} alt="" />
        </div>
        {!uploadData ? (
          <div>
            <button className="btn btn-primary m-4">Set Picture</button>
          </div>
        ) : (
          <div>
            <button className="btn btn-disable m-4" disabled>
              Set Picture
            </button>
          </div>
        )}
      </form>
      {uploadData ? (
        <DatabaseHandler userId={props.userId} profilePicture={imageSrc} />
      ) : (
        // Show an error message when uploadData is not successful
        <div>{uploadData}</div>
      )}
    </div>
  );
}
