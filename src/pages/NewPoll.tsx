import { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useReduxState, useAppDispatch } from "../hooks";
import { addError } from "../redux/reducers/errorReducer";
import { createQuestion } from "../redux/reducers/questions";

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
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        value={optionOne}
        onChange={(e) => setOptionOne(e.currentTarget.value)}
      />
      <input
        type="text"
        value={optionTwo}
        onChange={(e) => setOptionTwo(e.currentTarget.value)}
      />
      <button style={{ marginTop: 20 }}>Submit</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
