import ProfileSection from "@/components/profile/ProfileSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Profile",
  description: "Manage your account, subscription preferences, and delivery details in one place.",
};

export default function ProfilePage() {
  return (
    <>
      <ProfileSection />
      <Footer />
    </>
  );
}
