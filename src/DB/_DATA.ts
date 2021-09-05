import { User } from "../types/User";
import { Question } from "../types/Question";
import { NewQuestion } from "../utils";
import { formatQuestion } from "../utils";

export type UserDb = Record<string, User>;
export type QuestionsDb = Record<string, Question>;

export let users: UserDb = {
  sarahedo: {
    id: "sarahedo",
    name: "Sarah Edo",
    avatarURL: "https://miro.medium.com/fit/c/1360/1360/0*uKLd7KtYbYr-ZRbQ.",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL:
      "https://pbs.twimg.com/profile_images/1428205319616798721/xmr7q976_400x400.jpg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  johndoe: {
    id: "johndoe",
    name: "John Doe",
    avatarURL:
      "https://static.wikia.nocookie.net/villains/images/4/4a/Kevin_Spacey_John_Doe_Se7en.jpeg/revision/latest/top-crop/width/360/height/360?cb=20171230134058",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
};

export let questions: QuestionsDb = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    authorId: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "have horrible short term memory",
    },
    optionTwo: {
      votes: [],
      text: "have horrible long term memory",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    authorId: "johndoe",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "become a superhero",
    },
    optionTwo: {
      votes: ["johndoe", "sarahedo"],
      text: "become a supervillain",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    authorId: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "be telekinetic",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "be telepathic",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    authorId: "tylermcginnis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "be a front-end developer",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "be a back-end developer",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    authorId: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "find $50 yourself",
    },
    optionTwo: {
      votes: ["johndoe"],
      text: "have your best friend find $500",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    authorId: "johndoe",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["johndoe"],
      text: "write JavaScript",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "write Swift",
    },
  },
};

export function _getUsers(): Promise<UserDb> {
  return new Promise((res) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions(): Promise<QuestionsDb> {
  return new Promise((res) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

export const getQuestionById = async (id: string): Promise<Question> => {
  return new Promise((res, rej) => {
    const questionFound = questions[id];
    setTimeout(
      () =>
        questionFound
          ? res(questionFound)
          : rej(new Error("question not found")),
      1000
    );
  });
};

export const getUserById = async (id: string): Promise<User> => {
  return new Promise((res, rej) => {
    const userFound = users[id];
    setTimeout(
      () => (userFound ? res(userFound) : rej(new Error("user not found"))),
      1000
    );
  });
};

export function _saveQuestion(question: NewQuestion): Promise<Question> {
  return new Promise((res) => {
    const { authorId } = question;
    const formattedQuestion = formatQuestion(question);
    const author = users[authorId];
    const previousAuthorQuestions = author.questions ?? [];

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      users = {
        ...users,
        [authorId]: {
          ...author,
          questions: [...previousAuthorQuestions, formattedQuestion.id],
        },
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({
  userId,
  qid,
  option,
}: {
  userId: string;
  qid: string;
  option: "optionOne" | "optionTwo";
}): Promise<void> {
  return new Promise((res) => {
    const author = users[userId];
    const existingQuestion = questions[qid];
    const currentOption = existingQuestion[option];

    setTimeout(() => {
      users = {
        ...users,
        [userId]: {
          ...author,
          answers: {
            ...author.answers,
            [qid]: option,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...existingQuestion,
          [option]: {
            ...currentOption,
            votes: [...currentOption.votes, userId],
          },
        },
      };

      res();
    }, 500);
  });
}
