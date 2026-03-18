import { Tag, Badge } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { NavigateFunction } from 'react-router-dom'
import type { Product } from '../../types/products'
import styles from './ProductList.module.scss'
import { getRatingColor, getStockStatus } from './helper'

export const getColumns = (navigate: NavigateFunction): ColumnsType<Product> => [
  {
    title: 'Product',
    key: 'product',
    render: (_, record) => (
      <div className={styles.productCell}>
        <img src={record.thumbnail} alt={record.title} className={styles.thumbnail} />
        <span className={styles.productTitle}>{record.title}</span>
      </div>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category: string) => <Tag className={styles.categoryTag}>{category}</Tag>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => <span className={styles.price}>${price.toFixed(2)}</span>,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (rating: number) => (
      <span className={styles.rating} style={{ color: getRatingColor(rating) }}>
        ★ {rating.toFixed(1)}
      </span>
    ),
    sorter: (a, b) => a.rating - b.rating,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    render: (stock: number) => {
      const status = getStockStatus(stock)
      return <Badge status={status.color as 'success' | 'warning' | 'error'} text={status.text} />
    },
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <button className={styles.viewBtn} onClick={() => navigate(`/products/${record.id}`)}>
        <EyeOutlined /> View
      </button>
    ),
  },
]