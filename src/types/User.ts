import { Answer } from "./Answer";

export interface User {
    id: string;
    name: string;
    avatarURL?: string;
    answers?: Answer;
    questions?: string[];
}