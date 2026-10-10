import WalletSection from "@/components/wallet/WalletSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Wallet",
  description: "Manage your Tiffexx wallet balance, auto-reload, statements, and transaction history.",
};

export default function WalletPage() {
  return (
    <>
      <WalletSection />
      <Footer />
    </>
  );
}
