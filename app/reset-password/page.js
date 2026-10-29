import { Suspense } from "react";
import ResetPassword from "@/components/auth/ResetPassword";

export const metadata = {
  title: "Tiffexx – Reset your password",
  description: "Reset your Tiffexx account password to regain access to your meal subscriptions.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="reset-page page" />}>
      <ResetPassword />
    </Suspense>
  );
}

