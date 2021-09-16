import { FC, useState } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components";
import { Button } from ".";
import { Question } from "../types/Question";
import { Loading } from "./Loading";
import { useReduxState, useAppDispatch } from "../hooks";
import { saveAnswer } from "../redux/reducers/questions";
import { PollBreakDown } from "./PollBreakDown";

export const Poll: FC<{ questionKey?: string }> = ({ questionKey }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
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
  const usersSelection = poll.optionOne.votes.includes(currentUser.id)
    ? "optionOne"
    : poll.optionTwo.votes.includes(currentUser.id)
    ? "optionTwo"
    : undefined;

  const [selectedOption, setSelectedOption] = useState<
    keyof Pick<Question, "optionOne" | "optionTwo"> | undefined
  >(usersSelection);

  const handleAnswer = () => {
    dispatch(
      saveAnswer({
        userId: currentUser.id,
        questionId: poll.id,
        option: selectedOption!,
      })
    );
  };

  const { optionOne, optionTwo } = poll;

  const totalVotes = optionOne.votes.length + optionTwo.votes.length;

  const buttonsDisabled = !!usersSelection;

  return loading ? (
    <Loading />
  ) : !poll ? (
    <h1>404 not found</h1>
  ) : usersSelection && pathname !== "/" ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <PollBreakDown
        option={optionOne}
        percentage={(optionOne.votes.length / totalVotes) * 100}
      />
      <PollBox>
        <Wrapper>
          <Avatar>
            <img src={author.avatarURL} alt="avatar" />
          </Avatar>
          <h1>Would you rather</h1>
          <OptionOne
            selected={selectedOption === "optionOne"}
            buttonText={optionOne?.text}
            disabled={buttonsDisabled}
            onClick={() =>
              setSelectedOption((option) =>
                option === "optionOne" ? undefined : "optionOne"
              )
            }
          />
          <b>OR</b>
          <OptionTwo
            selected={selectedOption === "optionTwo"}
            buttonText={optionTwo?.text}
            disabled={buttonsDisabled}
            onClick={() =>
              setSelectedOption((option) =>
                option === "optionTwo" ? undefined : "optionTwo"
              )
            }
          />
        </Wrapper>
        {selectedOption && !usersSelection ? (
          <SubmitButton buttonText="Submit" onClick={handleAnswer} />
        ) : (
          <b id="bold">{usersSelection ? "✔" : "?"}</b>
        )}
      </PollBox>
      <PollBreakDown
        option={optionTwo}
        percentage={(optionTwo.votes.length / totalVotes) * 100}
      />
    </div>
  ) : (
    <PollBox>
      <Wrapper>
        <Avatar>
          <img src={author.avatarURL} alt="avatar" />
        </Avatar>
        <h1>Would you rather</h1>
        <OptionOne
          selected={selectedOption === "optionOne"}
          buttonText={optionOne?.text}
          disabled={buttonsDisabled}
          onClick={() =>
            setSelectedOption((option) =>
              option === "optionOne" ? undefined : "optionOne"
            )
          }
        />
        <b>OR</b>
        <OptionTwo
          selected={selectedOption === "optionTwo"}
          buttonText={optionTwo?.text}
          disabled={buttonsDisabled}
          onClick={() =>
            setSelectedOption((option) =>
              option === "optionTwo" ? undefined : "optionTwo"
            )
          }
        />
      </Wrapper>
      {selectedOption && !usersSelection ? (
        <SubmitButton buttonText="Submit" onClick={handleAnswer} />
      ) : (
        <b id="bold">{usersSelection ? "✔" : "?"}</b>
      )}
    </PollBox>
  );
};

const OptionOne = styled(Button)<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? "red" : "white")};
  border: 2px solid;
  border-color: #ff6060;
  width: 80%;
  color: ${({ selected }) => (selected ? "white" : "black")};
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
  justify-content: space-between;
  width: 300px;
  padding-bottom: 30px;
  border: 2px solid gray;
  border-radius: 8px;
  min-height: 500px;
  max-height: 550px;
  margin-bottom: 20px;
  overflow: auto;

  ${OptionOne},
  ${OptionTwo} {
    margin: 0 20px 0 20px;
  }

  #bold {
    font-size: 80px;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  b {
    margin: 15px 0;
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
