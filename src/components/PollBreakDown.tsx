import { FC } from "react";
import { Option } from "../types/Option";
import styled from "styled-components";

export const PollBreakDown: FC<{ option: Option; percentage: number }> = ({
  option,
  percentage,
}) => (
  <BreakDown>
    <h2>{option.text}</h2>
    <p>{option.votes.length}</p>
    <p>{percentage}%</p>
  </BreakDown>
);

const BreakDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
