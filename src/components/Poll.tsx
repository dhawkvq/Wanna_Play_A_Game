import { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Button } from ".";
import { Question } from "../types/Question";
import { Loading } from "./Loading";
import { useReduxState, useAppDispatch } from "../hooks";
import { saveAnswer } from "../redux/reducers/questions";

export const Poll: FC<{ questionKey?: string }> = ({ questionKey }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { question_id }: { question_id: string } = useParams();
  const pollKey = questionKey ?? question_id;
  const { currentUser, poll, author, loading } = useReduxState(
    ({ currentUser, allQuestions, allUsers, loading }) => {
      const poll = allQuestions[pollKey];
      return {
        currentUser,
        poll,
        author: allUsers[poll.authorId],
        loading,
      };
    }
  );
  const [selectedOption, setSelectedOption] =
    useState<keyof Pick<Question, "optionOne" | "optionTwo">>();

  const handleAnswer = () => {
    dispatch(
      saveAnswer({
        userId: currentUser.id,
        questionId: poll.id,
        option: selectedOption!,
      })
    ).then(() => history.push("/"));
  };

  const { optionOne, optionTwo } = poll;

  return loading ? (
    <Loading />
  ) : !poll ? (
    <h1>404 not found</h1>
  ) : (
    <PollBox>
      <div style={{ height: 100, width: 100 }}>
        <img
          src={author.avatarURL}
          style={{ height: "100%", width: "100%", borderRadius: 50 }}
          alt="avatar"
        />
      </div>
      <h1>Would you rather</h1>
      <OptionOne
        selected={selectedOption === "optionOne"}
        buttonText={optionOne?.text}
        onClick={() =>
          setSelectedOption((option) =>
            option === "optionOne" ? undefined : "optionOne"
          )
        }
      />
      <b style={{ margin: "15px 0" }}>OR</b>
      <OptionTwo
        selected={selectedOption === "optionTwo"}
        buttonText={optionTwo?.text}
        onClick={() =>
          setSelectedOption((option) =>
            option === "optionTwo" ? undefined : "optionTwo"
          )
        }
      />
      {selectedOption ? (
        <SubmitButton buttonText="Submit" onClick={handleAnswer} />
      ) : (
        <b style={{ fontSize: 80 }}>?</b>
      )}
    </PollBox>
  );
};

const OptionOne = styled(Button)<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? "red" : "white")};
  border: 2px solid;
  border-color: #ff6060;
  width: 80%;
  color: black;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const OptionTwo = styled(OptionOne)<{ selected?: boolean }>`
  border-color: blue;
  background-color: ${({ selected }) => (selected ? "blue" : "white")};
`;

const PollBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding-bottom: 30px;
  border: 2px dashed blue;

  ${OptionOne},
  ${OptionTwo} {
    margin: 0 20px 0 20px;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;
