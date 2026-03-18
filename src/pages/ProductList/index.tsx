import { useState } from "react";
import { Table, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {  AppstoreOutlined } from "@ant-design/icons";
import {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../../redux/features/products/productsApi";
import styles from "./ProductList.module.scss";
import type { Category } from "../../types/products";
import { TableSkeleton } from "../../components/common/Skeleton";
import { getColumns } from "./columns";

const { Search } = Input;
const { Option } = Select;
const PAGE_SIZE = 10;

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const skip = (page - 1) * PAGE_SIZE;

  const { data: allProducts, isLoading: loadingAll } = useGetProductsQuery(
    { limit: PAGE_SIZE, skip },
    { skip: !!searchQuery || !!selectedCategory },
  );
  const { data: searchedProducts, isLoading: loadingSearch } = useSearchProductsQuery(searchQuery, { skip: !searchQuery });
  const { data: categoryProducts, isLoading: loadingCategory } = useGetProductsByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });
  const { data: categories } = useGetCategoriesQuery();

  const isLoading = loadingAll || loadingSearch || loadingCategory;

  const getTableData = () => {
    if (searchQuery) return searchedProducts?.products ?? [];
    if (selectedCategory) return categoryProducts?.products ?? [];
    return allProducts?.products ?? [];
  };

  const getTotal = () => {
    if (searchQuery) return searchedProducts?.total ?? 0;
    if (selectedCategory) return categoryProducts?.total ?? 0;
    return allProducts?.total ?? 0;
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSelectedCategory("");
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSearchQuery("");
    setPage(1);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <AppstoreOutlined className={styles.titleIcon} />
          Products
        </h1>
        <p className={styles.subtitle}>
          {getTotal()} items {selectedCategory ? `in ${selectedCategory}` : searchQuery ? `matching "${searchQuery}"` : "total"}
        </p>
      </div>

      <div className={styles.filters}>
        <Search placeholder="Search products..." onSearch={handleSearch} allowClear onClear={handleClear} className={styles.searchInput} />
        <Select
          placeholder="All Categories"
          style={{ width: 200 }}
          allowClear
          value={selectedCategory || undefined}
          onChange={handleCategoryChange}
          onClear={handleClear}
        >
          {categories?.map((cat: Category) => (
            <Option key={cat.slug} value={cat.slug}>
              {cat.name}
            </Option>
          ))}
        </Select>
        {(searchQuery || selectedCategory) && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Clear filters
          </button>
        )}
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} columns={5} />
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            columns={getColumns(navigate)}
            dataSource={getTableData()}
            rowKey="id"
            className={styles.table}
            rowClassName={styles.tableRow}
            pagination={{
              current: page,
              pageSize: PAGE_SIZE,
              total: getTotal(),
              onChange: (p) => setPage(p),
              showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
              showSizeChanger: false,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
