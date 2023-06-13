import type { MonetaryCategory } from "../../util/types/types";

interface CategoryProps {
  category: MonetaryCategory;
}

const Category = ({ category }: CategoryProps) => <h1>{category}</h1>;

export default Category;
