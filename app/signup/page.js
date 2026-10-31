import { Suspense } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

export const metadata = {
  title: "Tiffexx – Create your account",
  description: "Create your Tiffexx account and start your daily homemade meal plan.",
};

export default async function SignUpPage({ searchParams }) {
  const params = await searchParams;
  const role = params?.role;

  if (role === "chef" || role === "delivery") {
    return (
      <Suspense fallback={<div className="signup-page page" />}>
        <SignUp />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="auth-page" />}>
      <SignIn initialMode="signup" />
    </Suspense>
  );
}
