import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui-lib/card"
import { Metadata } from "next"
import SignupForm from "@/app/(auth)/signup/SignupForm"

export const metadata: Metadata = {
  title: "Fleeti - Create an Account",
  description: "Join fleeti to share your content with time-based expiration options. Create an account and start sharing securely.",
  keywords: "fleeti signup, create account, secure sharing, content expiration, privacy, registration"
}

export default function Signup() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{ " " }
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
