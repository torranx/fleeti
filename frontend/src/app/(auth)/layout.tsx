import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode}) {
  return (
    <section className="flex justify-center items-center flex-col h-svh">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        { /* TODO: update logo */ }
        <Image
          alt=""
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="h-8 w-auto"
          width={ 32 }
          height={ 32 }
        />
      </Link>
      <div className="text-center text-gray-600 mt-4 mb-5">
        <p>
          Welcome to ExpireEase!
        </p>
        <p>
          Please log in or sign up to continue.
        </p>
      </div>
      { children }
    </section>
  )
}
