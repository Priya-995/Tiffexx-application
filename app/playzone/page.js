import PlayZoneRewards from "@/components/playzone/PlayZoneRewards";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Your rewards",
  description: "Spin, join contests, and win rewards on every order.",
};

export default function Page() {
  return (
    <>
      <PlayZoneRewards />
      <Footer />
    </>
  );
}
