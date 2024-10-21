import Heading1 from "@/components/custom/heading1"

export default function AboutUs() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-28 lg:px-8 lg:pt-36">
        <Heading1 className="text-center">
          About ExpireEase
        </Heading1>
        <div className="px-6 pt-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mt-6 text-lg leading-8 text-gray-700">
              { /* TODO: add name */ }
              My name is [name], and I am the sole developer behind this platform.
              ExpireEase was born out of a simple yet powerful idea:
              <strong>
                { " " }to give users control over their shared content and
                ensure that it only stays available for as long as needed
              </strong>.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-5">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
            <div>
              <p>
                As a solo developer, I’m passionate about building tools that simplify life and solve real-world problems.
                With ExpireEase, my goal is to provide a secure, user-friendly solution for temporary content sharing.
                Whether you’re sending confidential files, temporary links, or time-sensitive messages,
                ExpireEase helps ensure that your information disappears when it’s no longer needed.
              </p>
              <p className="mt-8">
                From brainstorming initial concepts to writing each line of code, every aspect of ExpireEase is a reflection
                of my commitment to creating a seamless user experience. As both the developer and the user, I understand the
                importance of keeping things simple yet powerful, and I’ve worked hard to ensure that ExpireEase is intuitive,
                reliable, and adaptable to your needs.
              </p>
            </div>
            <div>
              <p>
                Building this platform has been an incredible journey, and I’m excited to keep expanding and
                improving it with new features based on user feedback. Thank you for being a part of this journey,
                and I hope ExpireEase makes your digital sharing safer and more manageable.
              </p>
              <p className="mt-8">
                { /* TODO: add email */ }
                Feel free to reach out with any questions, feedback, or just to say hello at [email].
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
