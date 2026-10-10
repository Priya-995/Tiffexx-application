import { Suspense } from "react";
import SignUp from "@/components/auth/SignUp";

export const metadata = {
  title: "Tiffexx – Create your account",
  description: "Create your Tiffexx account and start your daily homemade meal plan.",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="signup-page page" />}>
      <SignUp />
    </Suspense>
  );
}

