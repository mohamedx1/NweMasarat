import React, { useState, useEffect, useRef } from "react";

interface CustomStyles {
  container?: React.CSSProperties;
  title?: React.CSSProperties;
  slider?: React.CSSProperties;
  progress?: React.CSSProperties;
  thumb?: React.CSSProperties;
  value?: React.CSSProperties;
}

interface CustomSliderProps {
  initialValue?: number;
  onValueChange?: (value: number) => void;
  customStyles?: CustomStyles;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  initialValue = 80,
  onValueChange,
  customStyles = {},
}) => {
  const [value, setValue] = useState(initialValue);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateValue = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newValue = Math.round(((clientX - rect.left) / rect.width) * 100);
      setValue(Math.max(0, Math.min(100, newValue)));
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    updateValue(event.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    updateValue(event.clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  return (
    <div
      style={{
        ...customStyles.container,
      }}
    >
      <div
        style={{
          ...customStyles.title,
          textAlign: "left",
          fontSize: "16px",
          marginBottom: "10px",
          direction: "rtl",
        }}
      >
        صوت المساعد الآلي
      </div>
      <div
        ref={sliderRef}
        style={{
          ...customStyles.slider,
          width: "100%",
          height: "4px",
          backgroundColor: "#e0e0e0",
          position: "relative",
          cursor: "pointer",
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          style={{
            ...customStyles.progress,
            width: `${value}%`,
            height: "100%",
            backgroundColor: "#ffd700",
            position: "absolute",
          }}
        />
        <div
          style={{
            ...customStyles.thumb,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "2px solid #ffd700",
            position: "absolute",
            top: "50%",
            left: `${value}%`,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{
          ...customStyles.value,
          textAlign: "end",
          color: "#666",
        }}
      >
        {value}%
      </div>
    </div>
  );
};

export default CustomSlider;
