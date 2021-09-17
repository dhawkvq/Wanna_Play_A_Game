import { FC, useState } from "react";
import { useParams, useLocation, Redirect } from "react-router";
import { Options } from "../types/Question";
import { Loading } from "./Loading";
import { useReduxState, useAppDispatch } from "../hooks";
import { saveAnswer } from "../redux/reducers/questions";
import { PollBreakDown } from "./PollBreakDown";
import { PollQuestion } from "./PollQuestion";
import styled from "styled-components";

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
        author: poll ? allUsers[poll.authorId] : undefined,
        loading,
      };
    }
  );
  const usersSelection = poll?.optionOne.votes.includes(currentUser.id)
    ? "optionOne"
    : poll?.optionTwo.votes.includes(currentUser.id)
    ? "optionTwo"
    : undefined;

  const [selectedOption, setSelectedOption] = useState<Options | undefined>(
    usersSelection
  );

  if (!poll) return <Redirect to="/OOF" />;

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

  const formatPercentage = (votes: number) =>
    Math.floor((votes / totalVotes) * 100);

  return loading ? (
    <Loading />
  ) : usersSelection && pathname !== "/" ? (
    <Stats>
      <PollBreakDown
        option={optionOne}
        percentage={formatPercentage(optionOne.votes.length)}
      />
      <PollQuestion
        question={poll}
        selectedOption={selectedOption}
        onOptionSelect={(option) =>
          setSelectedOption((currentOption) =>
            currentOption === option ? undefined : option
          )
        }
        buttonsDisabled={buttonsDisabled}
        authorImage={author?.avatarURL}
        usersSelection={usersSelection}
        handleSubmit={handleAnswer}
      />
      <PollBreakDown
        option={optionTwo}
        percentage={formatPercentage(optionTwo.votes.length)}
      />
    </Stats>
  ) : (
    <Stats>
      <PollQuestion
        question={poll}
        selectedOption={selectedOption}
        onOptionSelect={(option) =>
          setSelectedOption((currentOption) =>
            currentOption === option ? undefined : option
          )
        }
        buttonsDisabled={buttonsDisabled}
        authorImage={author?.avatarURL}
        usersSelection={usersSelection}
        handleSubmit={handleAnswer}
      />
    </Stats>
  );
};

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
