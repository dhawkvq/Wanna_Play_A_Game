import { FC, FormEvent, useState, MouseEvent } from "react";
import styled from "styled-components";
import { useAppDispatch, useReduxState } from "../hooks";
import { Button as SubmitButton } from "./Button";
import { login } from "../redux/reducers/currentUserReducer";
import { addError } from "../redux/reducers/errorReducer";

export const LoginModal: FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const existingUsers = useReduxState(({ allUsers }) => allUsers);
  const dispatch = useAppDispatch();

  const clearFields = () => {
    setUserName("");
    setPassword("");
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setRegister((signUp) => !signUp);
    clearFields();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let errorMessages: string[] = [];
    if (!register && !userName) {
      errorMessages.push("no userName");
    }
    if (!password) {
      errorMessages.push("no password");
    }
    if (!!errorMessages.length) {
      dispatch(addError(errorMessages));
    } else {
      dispatch(login(userName));
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>{register ? "Login" : "Sign Up"}</h2>
      <InputContainer>
        {register ? (
          <>
            <Select
              id="userSelect"
              onChange={(e) => {
                setUserName(e.currentTarget.value);
                setPassword("");
              }}
            >
              <option></option>
              {Object.entries(existingUsers).map(([key, user]) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            {userName && (
              <Input
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
              />
            )}
          </>
        ) : (
          <>
            <Input
              type="text"
              placeholder="User name"
              value={userName}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </>
        )}
      </InputContainer>
      <SubmitButton>Submit</SubmitButton>
      <p>
        {register ? "Not a member?" : "Already a member?"}{" "}
        <InlineButton onClick={handleClick}>
          {register ? "Sign Up" : "Login"}
        </InlineButton>
      </p>
    </LoginForm>
  );
};

const Select = styled.select`
  border: 2px solid #c9c9c9;
  border-radius: 5px;
  height: 35px;
  border-style: solid;
  width: 100%;
`;

const InputContainer = styled.div`
  width: 80%;
`;

const Input = styled.input`
  border-color: #c9c9c9;
  border-radius: 5px;
  height: 30px;
  border-style: solid;
  width: 97%;
`;

const LoginForm = styled.form`
  width: 300px;
  border: 1px solid white;
  color: #949494;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px 5px 10px;
  border: 2px solid #6262ff;
  border-radius: 8px;
  box-shadow: 2px 5px 15px #6262ffbc;

  select,
  input {
    margin-bottom: 10px;
  }
`;

const InlineButton = styled.button`
  border: none;
  background-color: white;
  color: #6262ff;
  cursor: pointer;
  font-weight: bold;
`;
