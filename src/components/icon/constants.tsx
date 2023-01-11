import React from "react";

export enum IconOptions {
  cross = "cross",
  tripleBars = "tripleBars",
}

export const iconMap = {
  tripleBars: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 2H0.5C0.223858 2 0 1.77614 0 1.5V0.5C0 0.223858 0.223858 0 0.5 0H17.5C17.7761 0 18 0.223858 18 0.5V1.5C18 1.77614 17.7761 2 17.5 2ZM18 7.5V6.5C18 6.22386 17.7761 6 17.5 6H0.5C0.223858 6 0 6.22386 0 6.5V7.5C0 7.77614 0.223858 8 0.5 8H17.5C17.7761 8 18 7.77614 18 7.5ZM18 12.5V13.5C18 13.7761 17.7761 14 17.5 14H0.5C0.223858 14 0 13.7761 0 13.5V12.5C0 12.2239 0.223858 12 0.5 12H17.5C17.7761 12 18 12.2239 18 12.5Z"
    />
  ),
  cross: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0491 15.6652C14.4953 16.1115 15.219 16.1115 15.6653 15.6652C16.1116 15.2189 16.1116 14.4953 15.6653 14.049L9.61627 7.99998L15.6653 1.95099C16.1116 1.50467 16.1116 0.781059 15.6653 0.334747C15.219 -0.111565 14.4953 -0.111565 14.0491 0.334747L8.00003 6.38375L1.95099 0.334735C1.50467 -0.111578 0.781051 -0.111578 0.334737 0.334735C-0.111578 0.781045 -0.111578 1.50466 0.334737 1.95098L6.38378 7.99998L0.334735 14.049C-0.111578 14.4953 -0.111578 15.2189 0.334735 15.6652C0.781051 16.1116 1.50467 16.1116 1.95099 15.6652L8.00003 9.61622L14.0491 15.6652Z"
    />
  ),
};
