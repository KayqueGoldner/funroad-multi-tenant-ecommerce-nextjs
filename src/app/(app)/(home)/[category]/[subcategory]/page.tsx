interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { category, subcategory } = await params;

  return (
    <div>
      <h1>subcategory: {subcategory}</h1>
      <h1>category: {category}</h1>
    </div>
  );
};

export default SubcategoryPage;
