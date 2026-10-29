import CreateNewPassword from "@/components/auth/CreateNewPassword";

export const metadata = {
  title: "Tiffexx – Create new password",
  description: "Set a new secure password for your Tiffexx meal subscription account.",
};

export default function NewPasswordPage() {
  return <CreateNewPassword />;
}
