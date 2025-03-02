"use client"

import { useState } from "react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui-lib/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui-lib/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const navigation = [
  { name: "Features", href: "/#features-section" },
  { name: "About Us", href: "/about-us" },
  { name: "FAQ", href: "/faq" },
]

export default function Header() {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
              width={ 32 }
              height={ 32 }
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet open={ mobileMenuOpen } onOpenChange={ setMobileMenuOpen }>
            <SheetTrigger>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="w-[310px]">
              <SheetHeader>
                <VisuallyHidden asChild>
                  <SheetTitle>Menu - Mobile</SheetTitle>
                </VisuallyHidden>
                <VisuallyHidden asChild>
                  <SheetDescription>
                    Menu items for mobile
                  </SheetDescription>
                </VisuallyHidden>
              </SheetHeader>
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-2">
                  <span className="sr-only">Your Company</span>
                  <Image
                    alt=""
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                    width={ 12 }
                    height={ 12 }
                  />
                </Link>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    { navigation.map((item) => (
                      <Link
                        onClick={ () => setMobileMenuOpen(false) }
                        key={ item.name }
                        href={ item.href }
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        { item.name }
                      </Link>
                    )) }
                  </div>
                  <div className="py-6">
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          { navigation.map((item) => (
            <Link key={ item.name } href={ item.href } className="text-sm font-semibold leading-6 text-gray-900">
              { item.name }
            </Link>
          )) }
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/login">
            <Button variant="link" className="text-sm font-semibold">
              Log in <span aria-hidden="true">&rarr;</span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
