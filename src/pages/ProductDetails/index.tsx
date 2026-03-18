import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Drawer, Form, Input, InputNumber, Tag, Spin, Alert, Image } from "antd";
import { ArrowLeftOutlined, EditOutlined, StarFilled, InboxOutlined, DollarOutlined } from "@ant-design/icons";
import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";
import styles from "./ProductDetails.module.scss";
import  { DetailSkeleton } from "../../components/common/Skeleton/DetailSkeleton";

const index = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));

  const handleEditOpen = () => {
    form.setFieldsValue({
      title: product?.title,
      description: product?.description,
      price: product?.price,
      stock: product?.stock,
      rating: product?.rating,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = (values: unknown) => {
    ("Form values:", values);
    setDrawerOpen(false);
  };

  

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "#22c55e";
    if (rating >= 3.5) return "#f59e0b";
    return "#ef4444";
  };

  if(isLoading){
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate("/")}>
          <ArrowLeftOutlined /> Back to Products
        </button>
        <div className={styles.card}>
          <DetailSkeleton imageHeight={340} thumbnailCount={4} infoRows={3} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.errorWrapper}>
        <Alert
          message="Product not found"
          description="Failed to load product details. Please go back and try again."
          type="error"
          showIcon
          action={
            <Button onClick={() => navigate("/")} size="small">
              Go Back
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back */}
      <button className={styles.backBtn} onClick={() => navigate("/")}>
        <ArrowLeftOutlined /> Back to Products
      </button>

  <div className={styles.card}>
    <div className={styles.imageSection}>
      <div className={styles.mainImage}>
        <Image
          src={product.images[activeImage]}
          alt={product.title}
          className={styles.mainImg}
          fallback="https://placehold.co/400x400?text=No+Image"
        />
      </div>
      <div className={styles.thumbnails}>
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} ${index + 1}`}
            className={`${styles.thumb} ${activeImage === index ? styles.thumbActive : ""}`}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>

    <div className={styles.infoSection}>
      <div className={styles.topRow}>
        <Tag className={styles.categoryTag}>{product.category}</Tag>
        <button className={styles.editBtn} onClick={handleEditOpen}>
          <EditOutlined /> Edit Product
        </button>
      </div>

      <h1 className={styles.productTitle}>{product.title}</h1>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <DollarOutlined className={styles.statIcon} style={{ color: "#6366f1" }} />
          <div>
            <div className={styles.statLabel}>Price</div>
            <div className={styles.statValue}>${product.price.toFixed(2)}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <StarFilled className={styles.statIcon} style={{ color: getRatingColor(product.rating) }} />
          <div>
            <div className={styles.statLabel}>Rating</div>
            <div className={styles.statValue} style={{ color: getRatingColor(product.rating) }}>
              {product.rating.toFixed(1)} / 5
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <InboxOutlined className={styles.statIcon} style={{ color: product.stock > 10 ? "#22c55e" : "#ef4444" }} />
          <div>
            <div className={styles.statLabel}>Stock</div>
            <div className={styles.statValue} style={{ color: product.stock > 10 ? "#22c55e" : "#ef4444" }}>
              {product.stock} units
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      {/* Edit Drawer */}
      <Drawer
        title="Edit Product"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={480}
        className={styles.drawer}
        footer={
          <div className={styles.drawerFooter}>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()} className={styles.saveBtn}>
              Save Changes
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Title is required" },
              { min: 3, message: "At least 3 characters" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Description is required" },
              { min: 10, message: "At least 10 characters" },
            ]}
          >
            <Input.TextArea rows={4} size="large" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[
              { required: true, message: "Price is required" },
              { type: "number", min: 0, message: "Must be positive" },
            ]}
          >
            <InputNumber prefix="$" style={{ width: "100%" }} size="large" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: "Stock is required" },
              { type: "number", min: 0, message: "Must be positive" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} size="large" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating (0–5)"
            rules={[
              { required: true, message: "Rating is required" },
              { type: "number", min: 0, max: 5, message: "Must be between 0 and 5" },
            ]}
          >
            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} size="large" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default index;
