import { FC, FormEvent, useState } from "react";
import styled from "styled-components";

export const LoginModal: FC<{
  setErrors: (value: string[]) => unknown;
}> = ({ setErrors }) => {
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
      console.log("you have been logged in!");
    }
    setName("");
    setPassword("");
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button>Submit</button>
    </LoginForm>
  );
};

const Input = styled.input``;

const LoginForm = styled.form`
  width: 300px;
  height: 200px;
  border: 1px solid white;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border: 2px dashed blue;
  margin-top: 120px;
  ${Input} {
    width: 80%;
    margin-bottom: 5px;
  }
`;
