"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import {
  authFormSchema,
  encryptId,
  extractCustomerIdFromUrl,
  parseStringify,
} from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { signIn, signUp } from "@/lib/actions/user.actions";

import { account, ID } from "../app/appwrite";
import { Models } from "appwrite";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  const signIn = async (userData: SignUpParams) => {
    const { email, password } = userData;
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    console.log("user login", user);

    return parseStringify(user);
  };

  const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    const createdUser = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    console.log(createdUser);
    const user = signIn(userData);
    console.log("user register", user);

    return user;
  };

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Sign up with Appwrite & create plaid token
      if (type === "sign-up") {
        console.log("asadad");

        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        console.log(userData);
        const newUser = await signUp(userData);
        console.log("data", data);
        console.log("newUser", newUser);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const responce = await signIn({
          email: data.email,
          password: data.password,
        });
        setUser(responce);
        if (responce) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="ex: John"
                      id="firstName"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="ex: Doe"
                      id="lastName"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                    id="address1"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    id="city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex: NY"
                      id="state"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 1101"
                      id="postalCode"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                      id="dateOfBirth"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="ex: 1234"
                      id="ssn"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                id="email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                id="password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
              <footer className="flex justify-center gap-1">
                <p className="text-14 font-normal text-gray-600">
                  {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link
                  href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                  className="form-link"
                >
                  {type === "sign-in" ? "Sign Up" : "Sign In"}
                </Link>
              </footer>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
