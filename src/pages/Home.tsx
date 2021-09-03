import { FC, useEffect, useState } from "react";
import { QuestionsDb, _getQuestions } from "../DB/_DATA";
import { User } from "../types/User";
import { Question } from "../types/Question";

export const Home: FC<{
  setErrors: (value: string[]) => unknown;
  loggedInUser: User;
}> = ({ setErrors, loggedInUser }) => {
  const [polls, setPolls] = useState<QuestionsDb>({});

  type SeperatedPolls = {
    answeredPolls: Question[];
    unAnsweredPolls: Question[];
  };

  useEffect(() => {
    _getQuestions()
      .then((questions) => setPolls(questions))
      .catch((error) => setErrors([error.message]));
  }, [setErrors]);

  const { answeredPolls, unAnsweredPolls } = Object.entries(polls).reduce(
    (acc, [key, poll]) => {
      const { optionOne, optionTwo } = poll;
      if (
        optionOne.votes.includes(loggedInUser.id) ||
        optionTwo.votes.includes(loggedInUser.id)
      ) {
        acc.answeredPolls = [...acc.answeredPolls, poll];
      } else {
        acc.unAnsweredPolls = [...acc.unAnsweredPolls, poll];
      }
      return acc;
    },
    {
      answeredPolls: [],
      unAnsweredPolls: [],
    } as SeperatedPolls
  );
  console.log(loggedInUser);
  return (
    <div style={{ display: "flex", border: "1px dashed blue", width: "100%" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Answered Polls</h1>
        {answeredPolls.map((poll) => (
          <h3 key={poll.id}>{poll.id}</h3>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>unAnswered Polls</h1>
        {unAnsweredPolls.map((poll) => (
          <h3 key={poll.id}>{poll.id}</h3>
        ))}
      </div>
    </div>
  );
};
