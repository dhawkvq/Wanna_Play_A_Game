import { FC } from "react";
import styled from "styled-components";

/**
 * @param {string} [buttonText="Submit"] = Defaults to Submit
 */

export const Button: FC<{
  buttonText?: string;
  onClick?(): unknown;
  className?: string;
}> = ({ buttonText = "Submit", onClick, className }) => (
  <ThemedButton onClick={onClick} className={className}>
    {buttonText}
  </ThemedButton>
);

const ThemedButton = styled.button`
  background-color: #6262ff;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;
