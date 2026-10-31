import FaqSection from "@/components/faq/FaqSection";

export const metadata = {
  title: "Tiffexx â€” FAQ",
  description:
    "Got questions about your tiffin? We've got answers. Everything you need to know about ordering, subscriptions, wallet and delivery, from your first tiffin to bulk orders.",
};

export default function FaqPage() {
  return (
    <>
      <main>
        <FaqSection />
      </main>
    </>
  );
}
