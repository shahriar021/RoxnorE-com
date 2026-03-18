import { Skeleton } from "antd";
import type { TableSkeletonProps } from "../../../types/products";

export const TableSkeleton = ({ rows = 8, columns = 5 }: TableSkeletonProps) => (
  <div>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 16px",
          borderBottom: "1px solid #f8fafc",
        }}
      >
        <Skeleton.Avatar active size={44} shape="square" style={{ borderRadius: 8, flexShrink: 0 }} />
        {Array.from({ length: columns }).map((_, j) => (
          <Skeleton
            key={j}
            active
            title={{ width: `${Math.floor(Math.random() * 30) + 20}%` }}
            paragraph={{ rows: 0 }}
            style={{ flex: 1 }}
          />
        ))}
      </div>
    ))}
  </div>
);
