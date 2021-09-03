import { Question } from "../types/Question";
import { QuestionsDb } from "../DB/_DATA";

export type NewQuestion = {
  authorId: string;
  optionOneText: string;
  optionTwoText: string;
};

export type SeperatedPolls = {
  answeredPolls: Question[];
  unAnsweredPolls: Question[];
};

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function formatQuestion({
  authorId,
  optionOneText,
  optionTwoText,
}: NewQuestion): Question {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    authorId,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export const organizePollsByUser = (userId: string, polls: QuestionsDb) =>
  Object.entries(polls).reduce(
    (acc, [, poll]) => {
      const { optionOne, optionTwo } = poll;
      if (
        optionOne.votes.includes(userId) ||
        optionTwo.votes.includes(userId)
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
