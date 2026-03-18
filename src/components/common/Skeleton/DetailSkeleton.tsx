import { Skeleton } from "antd";

interface DetailSkeletonProps {
  imageHeight?: number;
  thumbnailCount?: number;
  infoRows?: number;
}

export const DetailSkeleton = ({ imageHeight = 340, thumbnailCount = 4, infoRows = 3 }: DetailSkeletonProps) => (
  <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", overflow: "hidden" }}>
    <div style={{ padding: 24, background: "green", borderRight: "1px solid #f1f5f9" }}>
      <Skeleton.Image active style={{ width: 300, height: imageHeight, borderRadius: 12, flex: 1, backgroundColor: "red" }} />
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {Array.from({ length: thumbnailCount }).map((_, i) => (
          <Skeleton.Image key={i} active style={{ width: 60, height: 60, borderRadius: 8 }} />
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


//  background: "#f8fafc",