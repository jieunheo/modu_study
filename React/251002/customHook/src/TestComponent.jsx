import React from "react";
import useMouseLocation from "./hooks/useMouseLocation";

export default function TestComponent() {
  const mouseLocation = useMouseLocation({ x: 0, y: 0 });
  return (
    <div
      style={{
        position: "absolute",
        // top: mouseLocation.y,
        // left: mouseLocation.x,
        width: "100px",
        height: "100px",
        backgroundColor: mouseLocation.x > 100 ? "red" : "blue",
      }}
    >
      TestComponent
    </div>
  );
}
