//	Dependencies
import React from "react";
import "./icon.scss";
import { iconMap, IconOptions } from "./constants";
import { BaseInterface } from "constants/baseInterface";

interface IconProps extends BaseInterface {
  type: IconOptions;
  style?: any;
  className?: string;
  [rest: string]: any;
}
export default function Icon(props: IconProps) {
  const { className, style, type, title, ...restProps } = props;
  const iconPath = iconMap?.[type];
  return (
    <span {...restProps} style={style} title={`${title}-${type}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`c-icon ${className}`}
        width="32px"
        height="32px"
      >
        {iconPath}
      </svg>
    </span>
  );
}
