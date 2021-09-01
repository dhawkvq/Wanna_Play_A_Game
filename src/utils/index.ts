import { Question } from "../types/Question";

export type NewQuestion = {
  authorId: string;
  optionOneText: string;
  optionTwoText: string;
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
