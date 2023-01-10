//	Dependencies
import React from "react";
import "./icon.scss";
import { iconMap, IconOptions } from "./constants";
//
//	RAYC / UI / Components / Icon
//
interface IconProps {
  type: IconOptions;
  style?: any;
  [rest: string]: any;
}
export default function Icon(props: IconProps) {
  const { className, style, type, size, color, ...restProps } = props;
  const iconPath = iconMap?.[type];
  return (
    <span {...restProps} style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`c-icon ${className}`}
        viewBox="32 32 32"
        width="32px"
        height="32px"
      >
        {iconPath}
      </svg>
    </span>
  );
}