import { FC, FormEvent, useState } from "react";
import styled from "styled-components";

export const LoginModal: FC<{
  setErrors: (value: string[]) => unknown;
  loginUser: (value: boolean) => unknown;
}> = ({ setErrors, loginUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let errorMessages = [];
    if (!name) {
      errorMessages.push("no name");
    }
    if (!password) {
      errorMessages.push("no password");
    }
    if (!!errorMessages.length) {
      setErrors(errorMessages);
    } else {
      loginUser(true);
    }
    setName("");
    setPassword("");
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input
        type="text"
        placeholder="User name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <SubmitButton>Submit</SubmitButton>
    </LoginForm>
  );
};

const Input = styled.input`
  border-color: #c9c9c9;
  border-radius: 5px;
  height: 30px;
  border-style: solid;
`;

const LoginForm = styled.form`
  width: 300px;
  height: 200px;
  border: 1px solid white;
  color: #949494;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  border: 2px solid #6262ff;
  border-radius: 8px;
  box-shadow: 2px 5px 15px #6262ffbc;
  ${Input} {
    width: 80%;
    margin-bottom: 5px;
  }
`;

const SubmitButton = styled.button`
  background-color: #6262ff;
  padding: 10px 30px;
  border-color: #00008b;
  border: 1px solid;
  border-radius: 5px;
  color: white;
  margin-top: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;
