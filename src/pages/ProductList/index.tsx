import { useState } from "react";
import { Table, Input, Select, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../../redux/features/products/productsApi";
import type { Category, Product } from "../../types/products";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const PAGE_SIZE = 10;

const columns = (navigate: ReturnType<typeof useNavigate>): ColumnsType<Product> => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price}`,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating: number) => rating.toFixed(1),
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <button onClick={() => navigate(`/products/${record.id}`)} className="text-blue-600 hover:underline">
        View
      </button>
    ),
  },
];

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPage(1);
  };

  return (
    <div>
      <Title level={3}>Products</Title>

      <Space className="mb-4 flex flex-wrap gap-2">
        <Search placeholder="Search products..." onSearch={handleSearch} allowClear style={{ width: 300 }} onClear={handleClearFilters} />

        <Select
          placeholder="Filter by category"
          style={{ width: 200 }}
          allowClear
          value={selectedCategory || undefined}
          onChange={handleCategoryChange}
          onClear={handleClearFilters}
        >
          {categories?.map((cat: Category) => (
            <Option key={cat.slug} value={cat.slug}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </Space>

      <Table
        columns={columns(navigate)}
        dataSource={getTableData()}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total: getTotal(),
          onChange: (p) => setPage(p),
          showTotal: (total) => `Total ${total} products`,
        }}
      />
    </div>
  );
};

export default index;
