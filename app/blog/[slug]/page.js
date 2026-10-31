import BlogPostDetail from "@/components/blog/BlogPostDetail";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "how-home-kitchens-are-changing-food-delivery-in-india";
  
  if (slug === "how-home-kitchens-are-changing-food-delivery-in-india") {
    return {
      title: "How Home Kitchens Are Changing Food Delivery in India | Tiffexx",
      description: "From weekend cooks to full-time tiffin partners — home kitchens on Tiffexx are quietly rewriting what 'food delivery' means in Indian cities.",
    };
  }

  return {
    title: "Blog Article | Tiffexx",
    description: "Read fresh insights, partner stories, and food culture on the Tiffexx blog.",
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "how-home-kitchens-are-changing-food-delivery-in-india";

  return (
    <>
      <BlogPostDetail slug={slug} />
    </>
  );
}
