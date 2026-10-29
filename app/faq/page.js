import FaqSection from "@/components/faq/FaqSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx — FAQ",
  description:
    "Got questions about your tiffin? We've got answers. Everything you need to know about ordering, subscriptions, wallet and delivery, from your first tiffin to bulk orders.",
};

export default function FaqPage() {
  return (
    <>
      <main>
        <FaqSection />
      </main>
      <Footer className="footer--no-margin" />
    </>
  );
}
