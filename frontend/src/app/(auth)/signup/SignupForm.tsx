"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui-lib/form"
import { Input } from "@/components/ui-lib/input"
import { Button } from "@/components/ui-lib/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { handleFormError } from "@/utils/handleFormError"
import { useRouter } from "next/navigation"
import apiClient from "@/lib/apiClient"

const formSchema = z.object({
  email: z.string()
    .email("Email is not valid"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
});

export default function SignupForm() {
  const router = useRouter();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isEmailSet, setIsEmailSet ] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {
      const response = await apiClient.post("/auth/register", values);

      if (response.data.success) {
        router.push("/dashboard");
      } else {
        console.error("Unexpected response:", response.data);
        // Optionally, show an error message to the user using a toast or alert
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // Optionally, show an error message to the user using a toast or alert
    }
  }

  const handleEmailSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isEmailValidated = await form.trigger("email", { shouldFocus: true });

    if (!isEmailValidated) {
      return;
    }

    try {
      const response = await apiClient.post("/users/check-email", { email: form.getValues("email") }, {
        withCredentials: true,
      });

      if (response.data.exists) {
        form.setError("email", { message: "Email is already in use" });
        return;
      }

      setIsEmailSet(true);
      form.clearErrors();
      setTimeout(() => {
        form.setFocus("password")
      }, 200);
    } catch (error) {
      handleFormError(error, form.setError);
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(handleSubmit) } className="space-y-2">
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
        {
          // TODO: add password tooltip for password requirements
          isEmailSet &&
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
        }
        <Button
          className="w-full"
          type={ isEmailSet ? "submit" : "button" }
          onClick={ isEmailSet ? undefined : handleEmailSubmit }
        >
          { isEmailSet ? "Create account" : "Continue" }
        </Button>
      </form>
    </Form>
  )
}
