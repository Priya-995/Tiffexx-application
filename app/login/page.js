
import { Suspense } from "react";
import SignIn from "@/components/auth/SignIn";

export const metadata = {
  title: "Tiffexx – Sign in",
  description: "Sign in to keep your tiffins coming — fresh homemade meals delivered daily.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page" />}>
      <SignIn initialMode="signin" />
    </Suspense>
  );
}
