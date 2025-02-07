import React, { useEffect, useRef } from "react";
import "./RangeInput.scss";

export const DoubleRangeSlider = ({ 
  minValue = 0, 
  maxValue = 150000, 
  onChange,
  initialMin,
  initialMax 
}) => {
  const thumbLeftRef = useRef(null);
  const thumbRightRef = useRef(null);
  const rangeBetweenRef = useRef(null);

  const formatPrice = (price) => {
    return Math.round(price / 1000 / 10) * 10;
  };

  const setStartValueCustomSlider = (start, end) => {
    const maximum = Math.min(parseInt(start), parseInt(end) - 1);
    const percent = ((maximum - minValue) / (maxValue - minValue)) * 100;
    if (thumbLeftRef.current && rangeBetweenRef.current) {
      thumbLeftRef.current.style.left = `${percent}%`;
      rangeBetweenRef.current.style.left = `${percent}%`;
    }
  };

  const setEndValueCustomSlider = (end, start) => {
    const minimum = Math.max(parseInt(end), parseInt(start) + 1);
    const percent = ((minimum - minValue) / (maxValue - minValue)) * 100;
    if (thumbRightRef.current && rangeBetweenRef.current) {
      thumbRightRef.current.style.right = `${100 - percent}%`;
      rangeBetweenRef.current.style.right = `${100 - percent}%`;
    }
  };

  useEffect(() => {
    setStartValueCustomSlider(initialMin, initialMax);
    setEndValueCustomSlider(initialMax, initialMin);

    if (onChange) {
      onChange({ min: initialMin, max: initialMax });
    }
  }, [initialMin, initialMax, onChange]);

  const handleStartChange = (e) => {
    const value = Math.min(Number(e.target.value), initialMax - 1);
    onChange({ min: value, max: initialMax });
  };

  const handleEndChange = (e) => {
    const value = Math.max(Number(e.target.value), initialMin + 1);
    onChange({ min: initialMin, max: value });
  };

  return (
    <div className="range-slider__wrapper">
      <div className="range-slider">
        <div className="range-labels">
          <span className="small-text range-label range-label-start">
            {formatPrice(initialMin)}
          </span>
          <span className="small-text range-label range-label-end">
            {formatPrice(initialMax)}
            {initialMax === maxValue && "+"}
          </span>
        </div>

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={initialMin}
          onChange={handleStartChange}
          onMouseOver={() => thumbLeftRef.current?.classList.add("hover")}
          onMouseOut={() => thumbLeftRef.current?.classList.remove("hover")}
          onMouseDown={() => thumbLeftRef.current?.classList.add("active")}
          onMouseUp={() => thumbLeftRef.current?.classList.remove("active")}
          onTouchStart={() => thumbLeftRef.current?.classList.add("active")}
          onTouchEnd={() => thumbLeftRef.current?.classList.remove("active")}
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={initialMax}
          onChange={handleEndChange}
          onMouseOver={() => thumbRightRef.current?.classList.add("hover")}
          onMouseOut={() => thumbRightRef.current?.classList.remove("hover")}
          onMouseDown={() => thumbRightRef.current?.classList.add("active")}
          onMouseUp={() => thumbRightRef.current?.classList.remove("active")}
          onTouchStart={() => thumbRightRef.current?.classList.add("active")}
          onTouchEnd={() => thumbRightRef.current?.classList.remove("active")}
        />

        <div className="track-wrapper">
          <div className="track"></div>
          <div className="range-between" ref={rangeBetweenRef}></div>
          <div className="thumb left" ref={thumbLeftRef}></div>
          <div className="thumb right" ref={thumbRightRef}></div>
        </div>
      </div>
    </div>
  );
};