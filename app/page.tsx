import ScrollAnimation from './Components/scrollAnimation';

export default function Home() {
  return (
    <div className="">
      <div className="my-32">
        <h1 className="text-center font-bold text-6xl bg-gradient-to-b from-[#F5F5F5] to-primary text-transparent bg-clip-text">
          Welcome to TechNewZ
        </h1>
      </div>

      <div className="flex w-full my-16">
        <div className="grid flex-grow place-items-start ml-32">
          <div className="grid frosted flex-grow rounded-box overflow-hidden">
            <img
              className="object-cover h-[350px]"
              alt="News page"
              src="https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700476129/qg0cy2ti7ajkoswbxizw.png"
            />
          </div>
        </div>

        <div className="grid flex-grow place-items-center mr-32 w-80">
          <div>
            <p className="text-justify font-semibold text-xl tracking-wide indent-8 leading-loose">
              Stay ahead of the curve with TechNewZ, your source for the latest
              in the ever in the ever-evolving world of technology. At TechNewZ
              we pride ourselves on delivering unbiased and objective news
              coverage, ensuring you get an accurate and balanced insight into
              the fast-paced the fast-paced technology landscape.
            </p>
          </div>
        </div>
      </div>

      <ScrollAnimation>
        <div className="grid grid-cols-2 col-span-1 mt-32 mb-12">
          <div className="flex-grow place-items-center my-64 mx-32 ">
            <p className="text-justify font-semibold text-xl tracking-wide indent-8 leading-loose">
              At TechNewZ, we believe in the power of community engagement. Our
              comments section is the place where tech enthusiasts like you can
              share your thoughts, insights, and opinions on the latest news.
              Your perspective adds value to the conversation and fosters a
              dynamic exchange of ideas within our vibrant tech community.
            </p>
          </div>

          <div className="flex-grow place-items-end mr-16 ml-8">
            <div className="frosted flex-grow rounded-box overflow-hidden">
              <img
                className="object-cover h-90"
                alt="comment section of the news page"
                src="https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700476130/fj9e29rpmyd63fzpecxx.png"
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>
      <ScrollAnimation>
        <h2 className="text-center font-semibold text-2xl tracking-wide indent-8 leading-loose mt-16 mb-8">
          Create a profile
        </h2>
        <div className="flex justify-center ">
          <div className="flex items-center w-1/2">
            <div className="frosted flex-grow rounded-box overflow-hidden ">
              <img
                className="object-cover"
                alt="profile"
                src="https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700483228/zblzyaqrzppymzusl7zg.png"
              />
            </div>
          </div>
        </div>
        <div className="mx-64 mt-16 mb-32">
          <p className="text-justify font-semibold text-xl tracking-wide indent-8 leading-loose">
            Create your own space in the world with a TechNewZ profile. Your
            profile is the hub for all things where you can showcase your
            expertise, share your thoughts and stay thoughts and stay connected
            with the latest developments in the tech community.
          </p>
        </div>
      </ScrollAnimation>
      <ScrollAnimation>
        <div className="flex w-full my-64">
          <div className="grid flex-grow place-items-start ml-32">
            <div className="grid frosted flex-grow rounded-box overflow-hidden">
              <img
                className="object-cover h-[400px]"
                alt="Blog post"
                src="https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700475522/um1j26yxwbwy0slmyfli.png"
              />
            </div>
          </div>

          <div className="grid flex-grow place-items-center mr-32 w-80">
            <div>
              <p className="text-justify font-semibold text-xl tracking-wide indent-8 leading-loose">
                With Personal Blog Posts, you have the power to create and share
                your own tech stories. Whether you're a seasoned professional,
                an enthusiast, or someone exploring the tech landscape for the
                first time, your insights matter. This is your platform to dive
                deep into the heart of innovation and share your perspective
                with our global tech community.
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      <ScrollAnimation>
        <div className="flex w-full my-32">
          <div className="grid flex-grow place-items-center ml-32 w-80">
            <div>
              <p className="text-justify font-semibold text-xl tracking-wide indent-8 leading-loose">
                Your thoughts are important and we want to hear them! Our
                comments section is the beating heart of our blog, where tech
                enthusiasts like you come together to share insights, ask
                questions, and build connections. Your perspective adds depth to
                the stories we explore, turning each blog post into a dynamic
                conversation.
              </p>
            </div>
          </div>

          <div className="grid flex-grow place-items-start ml-32">
            <div className="grid frosted flex-grow rounded-box overflow-hidden">
              <img
                className="object-cover h-[500px]"
                alt=" comment section of the blog post"
                src="https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700475522/dqfrxbssnfrxkvbhgiof.png"
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}
