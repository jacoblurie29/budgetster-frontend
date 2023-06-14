import type { MonetaryItemCategory } from "../../types/types";

interface CategoryProps {
  category: MonetaryItemCategory;
}

const Category = ({ category }: CategoryProps) => <h1>{category}</h1>;

export default Category;
