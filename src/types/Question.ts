import { Option } from "./Option";

export interface Question {
  id: string;
  authorId: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
}

export type Options = keyof Pick<Question, "optionOne" | "optionTwo">;
