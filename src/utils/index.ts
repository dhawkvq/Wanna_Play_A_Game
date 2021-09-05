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

const compareTimeStamps = (time1: number, time2: number): number =>
  new Date(time1) > new Date(time2) ? -1 : 1;

export const organizePollsByUser = (
  userId: string,
  polls: QuestionsDb
): SeperatedPolls => {
  const { answeredPolls, unAnsweredPolls } = Object.entries(polls).reduce(
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
  return {
    answeredPolls: answeredPolls.sort((a, b) =>
      compareTimeStamps(a.timestamp, b.timestamp)
    ),
    unAnsweredPolls: unAnsweredPolls.sort((a, b) =>
      compareTimeStamps(a.timestamp, b.timestamp)
    ),
  };
};

export const isError = (error: any): error is Error =>
  "message" in error && error instanceof TypeError;
