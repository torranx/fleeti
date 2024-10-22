import Heading2 from "@/components/custom/heading2"
import { Button } from "@/components/ui/button"
import { AdjustmentsHorizontalIcon, CloudArrowUpIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const features = [
  {
    name: "Control Your Content ",
    description:
      "Decide how long your files, links, or messages remain accessible with custom expiration settings. Fleeti takes care of the rest, making your content disappear when you decide.",
    icon: LockClosedIcon,
  },
  {
    name: "Flexible Expiration Options",
    description:
      "Choose from time-based or view-based expirations, with more advanced options arriving soon.",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Effortless & Secure Sharing",
    description:
      "Upload and share your content seamlessly, knowing it will self-destruct according to your set rules.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Privacy & Security",
    description:
      "Your content stays protected with end-to-end encryption, offering peace of mind and control over who can access what you share.",
    icon: ShieldCheckIcon,
  },
]

export default function LandingPage() {
  return (
    <div className="bg-white">
      <section className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-36 sm:py-46 lg:py-48">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Make it last only as long as you need
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              With <strong>Fleeti</strong>, you decide how long your files, links, or messages stay accessible. Set the rules, and your content disappears when it&apos;s no longer needed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button>
                  Create Expiring Content
                </Button>
              </Link>
              <Link href="#features-section" className="text-sm font-semibold leading-6 text-gray-900">
                <Button variant="link" className="font-semibold">
                  Learn more <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pt-12 pb-24 sm:pb-32" id="features-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <Heading2 className="text-gray-700 !text-base">Share it. Forget it</Heading2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Full control over your content’s lifespan
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              Easily configure when your content should expire. Share with confidence, knowing that <strong>Fleeti</strong> ensures automatic removal when the time is right.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              { features.map((feature) => (
                <div key={ feature.name } className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-primary">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
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
      <section className="bg-accent">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Heading2 className="text-primary">Get started with Fleeti</Heading2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-700">
              Ready to take control of your content? Start sharing with Fleeti and make sure your content expires on your terms.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="#">
                <Button>
                  Create Your Account
                </Button>
              </Link>
              <Link href="/about-us" className="text-sm font-semibold leading-6 text-white">
                <Button variant="link" className="font-semibold">
                  About us <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
