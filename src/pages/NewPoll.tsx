import { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useReduxState, useAppDispatch } from "../hooks";
import { addError } from "../redux/reducers/errorReducer";
import { createQuestion } from "../redux/reducers/questions";
import { FormInput } from "../components/FormInput";
import { Button } from "../components";

export const NewPoll: FC = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const currentUser = useReduxState(({ currentUser }) => currentUser);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let formErrors: string[] = [];
    if (!optionOne) {
      formErrors.push("must create first option");
    }
    if (!optionTwo) {
      formErrors.push("must create second option");
    }
    if (formErrors.length) {
      dispatch(addError(formErrors));
    } else {
      dispatch(
        createQuestion({
          authorId: currentUser.id,
          optionOneText: optionOne,
          optionTwoText: optionTwo,
        })
      ).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Would you rather</h1>
        <Input
          type="text"
          placeholder="Do this?"
          value={optionOne}
          onChange={(e) => setOptionOne(e.currentTarget.value)}
        />
        <b style={{ margin: "10px 0" }}>Or</b>
        <Input
          type="text"
          placeholder="Most likely this?"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.currentTarget.value)}
        />
        {optionOne && optionTwo ? (
          <SubmitButton>Submit</SubmitButton>
        ) : (
          <QuestionMark>?</QuestionMark>
        )}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  min-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px dashed blue;
  min-width: 500px;
  border: 2px solid gray;
  border-radius: 8px;
  padding-bottom: 40px;
  margin-top: 40px;
`;

const Input = styled(FormInput)`
  width: 90%;
  margin-bottom: 5px;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  margin-top: 30px;
`;

const QuestionMark = styled.b`
  margin-top: 30px;
  font-size: 40px;
`;
