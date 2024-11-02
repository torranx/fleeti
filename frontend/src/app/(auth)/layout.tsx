import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode}) {
  return (
    <section className="flex justify-center items-center flex-col min-h-screen py-12">
      <Link href="/" className="-m-1.5 p-1.5 mb-5">
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
      { children }
    </section>
  )
}
