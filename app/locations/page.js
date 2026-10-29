import LocationsSection from "@/components/locations/LocationsSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Locations",
  description: "Browse Tiffexx home kitchens and tiffin delivery locations in Bengaluru, Noida, Pune, Hyderabad, and more.",
};

export default function LocationsPage() {
  return (
    <>
      <LocationsSection />
      <Footer />
    </>
  );
}
