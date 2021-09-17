import { FC } from "react";
import { Option } from "../types/Option";
import styled from "styled-components";

export const PollBreakDown: FC<{ option: Option; percentage: number }> = ({
  option,
  percentage,
}) => (
  <BreakDown>
    <Selection>{option.text}</Selection>
    <h3 style={{}}>Total Votes</h3>
    <OptionVotes>{option.votes.length}</OptionVotes>
    <h3 style={{ marginTop: 40 }}>Percentage of Overall Votes</h3>
    <OptionPercentage>{percentage}%</OptionPercentage>
  </BreakDown>
);

const BreakDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 2px solid gray;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  margin: 20px;
`;

const Selection = styled.h2`
  width: 90%;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 8px;
`;

const OptionVotes = styled.span`
  border: 1px solid gray;
  width: 50%;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
`;

const OptionPercentage = styled(OptionVotes)``;
