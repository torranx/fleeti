import Header from "@/components/custom/header"
import { AdjustmentsHorizontalIcon, CloudArrowUpIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"

const features = [
  {
    name: "Control Your Content ",
    description:
      "Decide how long your files, links, or messages stay accessible with custom expiration rules, and let your content disappear when needed.",
    icon: LockClosedIcon,
  },
  {
    name: "Flexible Expiration Options",
    description:
      "Select from time-based or view-based expirations, with more options coming soon.",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Simple & Secure Sharing",
    description:
      "Upload and share your content easily, knowing it will automatically expire based on your rules.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Privacy & Security",
    description:
      "Your shared content is protected with end-to-end encryption, ensuring your privacy and control over accessibility.",
    icon: ShieldCheckIcon,
  },
]

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Header />

      <section className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={ {
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            } }
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-3xl py-36 sm:py-46 lg:py-48">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Take control of your shared content
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              With ExpireEase, you decide how long your files, links, or messages stay accessible. Set the rules, and your content disappears when it&apos;s no longer needed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Expiring Content
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={ {
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            } }
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>
      <section className="bg-white pt-12 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Set, Share, Expire</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Full control over content accessibility
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Easily set rules for when your content expires. Share it confidently, knowing ExpireEase will automatically remove it when the time comes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              { features.map((feature) => (
                <div key={ feature.name } className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    { feature.name }
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{ feature.description }</dd>
                </div>
              )) }
            </dl>
          </div>
        </div>
      </section>
      <section className="bg-indigo-700">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get Started Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
              Ready to take control of your content? Start sharing with ExpireEase and make sure your content expires on your terms.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Create Your Account
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
