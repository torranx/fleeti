"use client"

import { Button } from "@/components/ui-lib/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui-lib/form"
import { Input } from "@/components/ui-lib/input"
import apiClient from "@/lib/apiClient"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string()
});

export default function LoginForm() {
  const [ showPassword, setShowPassword ] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await apiClient.post("/auth/login", values);

      if (response.data.success) {
        router.push("/dashboard");
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(handleSubmit) }>
        <FormField
          control={ form.control }
          name="email"
          render={ ({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Email</FormLabel>
              <FormControl>
                <Input className="!mt-1" type="email" { ...field } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="password"
          render={ ({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input className="!mt-1" type={ showPassword ? "text" : "password" } { ...field } />
                  {
                    showPassword
                      ? <EyeIcon onClick={ () => setShowPassword(false) } className="text-gray-700 cursor-pointer absolute right-3 w-4 bottom-3" />
                      : <EyeSlashIcon onClick={ () => setShowPassword(true) } className="text-gray-700 cursor-pointer absolute right-3 w-4 bottom-3" />
                  }
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
        <Link href="#" className="ml-auto block text-sm underline mb-3 mt-1 text-right">
          Forgot your password?
        </Link>
        <div className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={ form.formState.isSubmitting }>
            { form.formState.isSubmitting ? "Logging in..." : "Login" }
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{ " " }
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </Form>
  )
}
