"use client";
import { Excalidraw } from "@excalidraw/excalidraw";

const ExcalidrawWrapper: React.FC = () => {
  return (
    <div style={{ height: "500px", width: "500px" }}>
      <Excalidraw />
    </div>
  );
};
export default ExcalidrawWrapper;
