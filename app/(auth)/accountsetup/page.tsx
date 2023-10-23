import React from 'react';

export default function Accountsetup() {
  return (
    <div className="flex justify-center ">
      <div className="card frosted z-[1] p-8 w-96">
        <form action="/" className="grid">
          <h1 className="m-4 text-lg text-center">Create your profil</h1>
          <p className="mb-1 ml-4 text-md">Profilpicture</p>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            className="rounded-box"
          />
        </form>
        <ul className="steps">
          <li className="step step-primary">Register</li>
          <li className="step step-primary">Account Setup</li>
          <li className="step">Ready</li>
        </ul>
      </div>
    </div>
  );
}
