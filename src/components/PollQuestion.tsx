import { FC } from "react";
import styled from "styled-components";
import { Question, Options } from "../types/Question";
import { Button } from "./Button";

export const PollQuestion: FC<{
  question: Question;
  selectedOption?: Options;
  onOptionSelect?: (option: Options) => void;
  buttonsDisabled?: boolean;
  authorImage?: string;
  usersSelection?: Options;
  handleSubmit?: () => void;
}> = ({
  question,
  selectedOption,
  onOptionSelect = () => {},
  buttonsDisabled = false,
  authorImage,
  usersSelection,
  handleSubmit,
}) => {
  const { optionOne, optionTwo } = question;
  return (
    <PollBox>
      <Avatar>
        <img src={authorImage} alt="avatar" />
      </Avatar>
      <h1>Would you rather</h1>
      <OptionOne
        selected={selectedOption === "optionOne"}
        disabled={buttonsDisabled}
        onClick={() => onOptionSelect("optionOne")}
      >
        {optionOne?.text}
      </OptionOne>
      <b>OR</b>
      <OptionTwo
        selected={selectedOption === "optionTwo"}
        disabled={buttonsDisabled}
        onClick={() => onOptionSelect("optionTwo")}
      >
        {optionTwo?.text}
      </OptionTwo>
      {selectedOption && !usersSelection ? (
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      ) : (
        <b id="bold">{usersSelection ? "✔" : "?"}</b>
      )}
    </PollBox>
  );
};

const OptionOne = styled(Button)<{ selected?: boolean; disabled?: boolean }>`
  background-color: white;
  border: 2px solid;
  border-color: ${({ selected }) => (selected ? "green" : "gray")};
  width: 80%;
  color: black;
  transition: all 0.5s ease;
  box-shadow: ${({ selected }) => (selected ? "  2px 2px 15px green" : "none")};

  &:hover {
    transform: ${({ disabled }) => (disabled ? "" : "scale(1.05)")};
    border-color: ${({ selected, disabled }) =>
      selected ? "green" : disabled ? "gray" : "#6262ff"};
    box-shadow: ${({ selected, disabled }) =>
      selected
        ? " 2px 2px 15px green"
        : disabled
        ? ""
        : " 2px 2px 15px #6262ff"};
  }
`;

const OptionTwo = styled(OptionOne)``;

const PollBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  padding-bottom: 30px;
  border: 2px solid gray;
  border-radius: 8px;
  min-height: 500px;
  max-height: 550px;
  margin-bottom: 20px;

  ${OptionOne},
  ${OptionTwo} {
    margin: 0 20px 0 20px;
  }

  #bold {
    font-size: 80px;
  }
`;

const Avatar = styled.div`
  height: 100px;
  width: 100px;
  margin-top: 20px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 8px;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;
