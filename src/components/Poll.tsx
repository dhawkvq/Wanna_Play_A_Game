import { FC, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Button } from ".";
import { getQuestionById, getUserById } from "../DB/_DATA";
import { Question } from "../types/Question";
import { User } from "../types/User";
import { Loading } from "./Loading";

const isError = (error: any): error is Error =>
  "message" in error && error instanceof TypeError;

export const Poll: FC<{
  setErrors: (value: string[]) => unknown;
}> = ({ setErrors }) => {
  const { question_id }: { question_id: string } = useParams();
  const [poll, setPoll] = useState<Question>({} as Question);
  const [author, setAuthor] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<Question["optionOne" | "optionTwo"]["text"]>();

  const getQuestionAndAuthor = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const question = await getQuestionById(id);
        const author = await getUserById(question.authorId);
        setPoll(question);
        setAuthor(author);
      } catch (error) {
        if (isError(error)) {
          setErrors([error.message]);
        }
      } finally {
        setLoading(false);
      }
    },
    [setPoll, setErrors]
  );

  useEffect(() => {
    if (question_id) {
      getQuestionAndAuthor(question_id);
    }
  }, [question_id, getQuestionAndAuthor]);

  const { optionOne, optionTwo } = poll;

  return loading ? (
    <Loading />
  ) : !poll ? (
    <h1>404 not found</h1>
  ) : (
    <PollBox>
      <div style={{ height: 100, width: 100 }}>
        <img
          src={author.avatarURL}
          style={{ height: "100%", width: "100%", borderRadius: 50 }}
          alt="avatar"
        />
      </div>
      <h1>Would you rather</h1>
      <OptionOne
        selected={selectedOption === optionOne?.text}
        buttonText={optionOne?.text}
        onClick={() =>
          setSelectedOption((option) =>
            option === optionOne?.text ? undefined : optionOne?.text
          )
        }
      />
      <b style={{ margin: "15px 0" }}>OR</b>
      <OptionTwo
        selected={selectedOption === optionTwo?.text}
        buttonText={optionTwo?.text}
        onClick={() =>
          setSelectedOption((option) =>
            option === optionTwo?.text ? undefined : optionTwo?.text
          )
        }
      />
      <b style={{ fontSize: 80 }}>?</b>
    </PollBox>
  );
};

const PollBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 400px;
  border: 2px dashed blue;

  button {
    margin: 0 20px;
  }
`;

const OptionOne = styled(Button)<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? "red" : "white")};
  border: 2px solid;
  border-color: #ff6060;
  width: 80%;
  color: black;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const OptionTwo = styled(OptionOne)<{ selected?: boolean }>`
  border-color: blue;
  background-color: ${({ selected }) => (selected ? "blue" : "white")};
`;
