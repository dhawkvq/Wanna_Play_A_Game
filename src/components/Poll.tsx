import { FC, useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Button } from ".";
import { getQuestionById, getUserById, _saveQuestionAnswer } from "../DB/_DATA";
import { Question } from "../types/Question";
import { User } from "../types/User";
import { Loading } from "./Loading";
import { isError } from "../utils";

export const Poll: FC<{
  setErrors: (value: string[]) => unknown;
  currentUser: User;
}> = ({ setErrors, currentUser }) => {
  const history = useHistory();
  const { question_id }: { question_id: string } = useParams();
  const [poll, setPoll] = useState<Question>({} as Question);
  const [author, setAuthor] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<keyof Pick<Question, "optionOne" | "optionTwo">>();

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

  const saveAnswer = async () => {
    setLoading(true);
    try {
      await _saveQuestionAnswer({
        userId: currentUser.id,
        qid: poll.id,
        option: selectedOption!,
      });
      history.push("/");
    } catch (error) {
      if (isError(error)) {
        setErrors([error.message]);
      }
    } finally {
      setLoading(false);
    }
  };

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
        selected={selectedOption === "optionOne"}
        buttonText={optionOne?.text}
        onClick={() =>
          setSelectedOption((option) =>
            option === "optionOne" ? undefined : "optionOne"
          )
        }
      />
      <b style={{ margin: "15px 0" }}>OR</b>
      <OptionTwo
        selected={selectedOption === "optionTwo"}
        buttonText={optionTwo?.text}
        onClick={() =>
          setSelectedOption((option) =>
            option === "optionTwo" ? undefined : "optionTwo"
          )
        }
      />
      {selectedOption ? (
        <SubmitButton buttonText="Submit" onClick={saveAnswer} />
      ) : (
        <b style={{ fontSize: 80 }}>?</b>
      )}
    </PollBox>
  );
};

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

const PollBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding-bottom: 30px;
  border: 2px dashed blue;

  ${OptionOne},
  ${OptionTwo} {
    margin: 0 20px 0 20px;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;
