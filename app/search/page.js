import SearchResults from "@/components/search/SearchResults";

export const metadata = {
  title: "Tiffexx – Search results",
};

export default async function SearchPage(props) {
  const resolvedParams = props?.searchParams ? await props.searchParams : {};
  const rawQ = resolvedParams?.q;
  const query = (Array.isArray(rawQ) ? rawQ[0] : rawQ) || "Thali";

  return <SearchResults key={query} query={query} />;
}
