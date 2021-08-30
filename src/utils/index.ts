import { Question } from "../types/Question"

export type NewQuestion = {
    author: string;
    optionOneText: string;
    optionTwoText: string;
};

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
export function formatQuestion ({ 
    author, 
    optionOneText, 
    optionTwoText
}: NewQuestion): Question {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
        votes: [],
        text: optionOneText,
        },
        optionTwo: {
        votes: [],
        text: optionTwoText,
        }
    }
}