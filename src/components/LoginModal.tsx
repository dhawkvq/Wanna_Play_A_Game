import { FC, FormEvent, useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { UserDb, _getUsers } from "../DB/_DATA";
import { User } from "../types/User";

export const LoginModal: FC<{
  setErrors: (value: string[]) => unknown;
  loginUser: (value: User) => unknown;
}> = ({ setErrors, loginUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [existingUsers, setExistingUsers] = useState<UserDb>({});

  useEffect(() => {
    // Grab all exisiting users on mount
    _getUsers()
      .then((users) => setExistingUsers(users))
      .catch((error) => setErrors([error.message]));
  }, [setErrors]);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setRegister((signUp) => !signUp);
    setUserName("");
    setPassword("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let errorMessages = [];
    if (!register && !userName) {
      errorMessages.push("no userName");
    }
    if (!password) {
      errorMessages.push("no password");
    }
    if (!!errorMessages.length) {
      setErrors(errorMessages);
    } else {
      loginUser({
        id: userName,
        name: userName,
      });
    }
    setUserName("");
    setPassword("");
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

const SubmitButton = styled.button`
  background-color: #6262ff;
  padding: 10px 30px;
  border-color: #00008b;
  border: 1px solid;
  border-radius: 5px;
  color: white;
  margin: 20px 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;

const InlineButton = styled.button`
  border: none;
  background-color: white;
  color: #6262ff;
  cursor: pointer;
  font-weight: bold;
`;
