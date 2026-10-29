import BlogSection from "@/components/blog/BlogSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Blog",
  description: "Read kitchen spotlights, healthy meal prep tips, and home food stories from Tiffexx partner kitchens across India.",
};

export default function BlogPage() {
  return (
    <>
      <BlogSection />
      <Footer />
    </>
  );
}
