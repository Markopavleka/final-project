/* import React from 'react';

export default function PostBlog() {
  const [titel, setTitel] = useState('');
  const [post, setPost] = useState('');

  return (
    <div className="flex justify-center">
      <div className="card frosted z-[1] w-1/2 ml-4">
        <h1 className="text-2xl text-center my-4">Create a Post:</h1>
        <form
          onSubmit={async (event) => await handlePost(event)}
          className="mx-24"
        >
          <label>
            <p className="mb-1 ml-4 text-md">Title:</p>
            <input
              onChange={(event) => {
                setTitel(event.currentTarget.value);
              }}
              className="frosted p-2 mt-1 mb-2 w-full"
              placeholder="Ask a question or add a title"
            />
          </label>
          <label>
            <p className="mb-1 ml-4 text-md">Text:</p>
            <input
              onChange={(event) => {
                setPost(event.currentTarget.value);
              }}
              className="frosted p-2 mt-1 mb-2 w-full h-52"
              placeholder="Provide some more information"
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
 */
