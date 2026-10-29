import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Contact",
  description:
    "Get in touch with Tiffexx. Send us a message, contact our support team, or find our Bengaluru HQ office details.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <Footer />
    </>
  );
}
