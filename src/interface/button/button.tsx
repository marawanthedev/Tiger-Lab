import React from "react";
import { BaseInterface } from "constants/baseInterface";
import "./button.scss";

interface CustomButtonProps extends BaseInterface {
  innerText: string;
  color: string;
  backGroundColor?: string;
  boxShadow?: string;
  className?: string;
  type?: any;
  width: string;
  height?: string;
  margin?: string;
  icon?: string;
  borderRadius?: string;
  onClick?: Function;
  padding?: string;
  border?: string;
  fontWeight?: string;
  fontSize?: string;
  alignSelf?: string;
}

const CustomButton = ({
  backGroundColor,
  innerText,
  color,
  type,
  width,
  height,
  margin,
  onClick,
  className,
  padding,
  border,
  fontWeight,
  fontSize,
  alignSelf,
  title,
  ...rest
}: CustomButtonProps) => {
  const style = {
    backgroundColor: backGroundColor,
    color: color,
    width,
    height,
    ...rest,
  };

  return (
    <button
      title={`${title}-btn`}
      type={type}
      onClick={() => onClick && onClick()}
      className={`custom-button ${className} bg-primary`}
      style={style}
      {...rest}
    >
      {innerText}
    </button>
  );
};

export default CustomButton;
