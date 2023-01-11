import React from "react";
import { BaseInterface } from "constants/baseInterface";
import "./button.scss";
import { ButtonTypes } from "constants/ButtonType";

interface CustomButtonProps extends BaseInterface {
  innerText: string;
  color: string;
  backGroundColor?: string;
  boxShadow?: string;
  className?: string;
  type?: ButtonTypes;
  width: string;
  height?: string;
  borderRadius?: string;
  onClick?: Function;
}
const CustomButton = ({
  backGroundColor,
  innerText,
  color,
  type,
  width,
  height,
  onClick,
  className,
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
      title={`${title}`}
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
