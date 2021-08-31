import { FC, FormEvent, useState } from "react";
import styled from "styled-components";

export const LoginModal: FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let errors = [];
    if (!name) {
      errors.push("no name");
    }
    if (!password) {
      errors.push("no password");
    }
    if (!!errors.length) {
      setErrors(errors);
    } else {
      console.log("you have been logged in!");
    }
    setName("");
    setPassword("");
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      {!!errors.length && (
        <ErrorMessage onClick={() => setErrors([])}>
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </ErrorMessage>
      )}
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
  ${Input} {
    width: 80%;
    margin-bottom: 5px;
  }
`;

const ErrorMessage = styled.div`
  width: 90%;
  position: absolute;
  top: 10px;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
  padding: 10px 0;

  & p {
    margin: 0;
  }
`;
