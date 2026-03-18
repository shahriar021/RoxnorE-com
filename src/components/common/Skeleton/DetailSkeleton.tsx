import { Skeleton } from "antd";
import type { DetailSkeletonProps } from "../../../types/products";

export const DetailSkeleton = ({ imageHeight=340,thumbnailCount = 4, infoRows = 3 }: DetailSkeletonProps) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
    
    <div style={{ padding: 24, background: "#f8fafc", borderRight: "1px solid #f1f5f9" }}>
      
      <div
        style={{
          width: "100%",
          height:imageHeight,
          aspectRatio: "1",
          borderRadius: 12,
          background: "#e2e8f0",
          backgroundImage: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />

      
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {Array.from({ length: thumbnailCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              background: "#e2e8f0",
              backgroundImage: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>

   
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
      <Skeleton active title={{ width: "60%" }} paragraph={{ rows: infoRows }} />
      <Skeleton active title={{ width: "40%" }} paragraph={{ rows: 0 }} />
      <Skeleton active title={{ width: "40%" }} paragraph={{ rows: 0 }} />
      <Skeleton active title={{ width: "40%" }} paragraph={{ rows: 0 }} />
    </div>
  </div>
);
