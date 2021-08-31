import { Option } from "./Option";

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
}
