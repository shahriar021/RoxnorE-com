import { useState } from "react";
import { Table, Input, Select, Typography, Tag, Space, Badge } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, AppstoreOutlined, EyeOutlined } from "@ant-design/icons";
import {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../../redux/features/products/productsApi";
import styles from "./ProductList.module.scss";
import type { Category, Product } from "../../types/products";
import  { TableSkeleton } from "../../components/common/Skeleton";

const { Search } = Input;
const { Option } = Select;

const PAGE_SIZE = 10;

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return "#22c55e";
  if (rating >= 3.5) return "#f59e0b";
  return "#ef4444";
};

const getStockStatus = (stock: number) => {
  if (stock > 50) return { color: "success", text: stock };
  if (stock > 10) return { color: "warning", text: stock };
  return { color: "error", text: stock };
};

const index = () => {
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

  const isLoading = loadingAll || loadingSearch || loadingCategory;

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

  const columns: ColumnsType<Product> = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className={styles.productCell}>
          <img src={record.thumbnail} alt={record.title} className={styles.thumbnail} />
          <span className={styles.productTitle}>{record.title}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag className={styles.categoryTag}>{category}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span className={styles.price}>${price.toFixed(2)}</span>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <span className={styles.rating} style={{ color: getRatingColor(rating) }}>
          ★ {rating.toFixed(1)}
        </span>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => {
        const status = getStockStatus(stock);
        return <Badge status={status.color as "success" | "warning" | "error"} text={status.text} />;
      },
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <button className={styles.viewBtn} onClick={() => navigate(`/products/${record.id}`)}>
          <EyeOutlined /> View
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <AppstoreOutlined className={styles.titleIcon} />
            Products
          </h1>
          <p className={styles.subtitle}>
            {getTotal()} items {selectedCategory ? `in ${selectedCategory}` : searchQuery ? `matching "${searchQuery}"` : "total"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`${styles.filters} w-full `}>
        <Search
          prefix={<SearchOutlined className={styles.searchIcon} />}
          placeholder="Search products..."
          onSearch={handleSearch}
          allowClear
          onClear={handleClear}
          className={`${styles.searchInput} flex-1`}
        />

        <Select
          placeholder="All Categories"
          style={{ width: 200 }}
          allowClear
          value={selectedCategory || undefined}
          onChange={handleCategoryChange}
          onClear={handleClear}
          suffixIcon={<AppstoreOutlined />}
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

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={8} columns={5} />
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            columns={columns}
            dataSource={getTableData()}
            rowKey="id"
            loading={isLoading}
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

export default index;
