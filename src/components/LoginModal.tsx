import { FC, FormEvent, useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { UserDb, _getUsers } from "../DB/_DATA";

export const LoginModal: FC<{
  setErrors: (value: string[]) => unknown;
  loginUser: (value: boolean) => unknown;
}> = ({ setErrors, loginUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [existingUsers, setExistingUsers] = useState<UserDb>({});
  const [selectedUser, setSelectedUser] = useState<string | undefined>();

  useEffect(() => {
    // Grab all exisiting users on mount
    _getUsers()
      .then((users) => setExistingUsers(users))
      .catch((error) => setErrors([error.message]));
  }, [setErrors]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let errorMessages = [];
    if (!register && !name) {
      errorMessages.push("no name");
    }
    if (register && !selectedUser) {
      errorMessages.push("no selected user");
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
      <h2>{register ? "Login" : "Sign Up"}</h2>
      {register ? (
        <>
          <label htmlFor="userSelect" style={{ marginBottom: 30 }}>
            Choose and existing user
          </label>
          <select
            id="userSelect"
            style={{ marginBottom: 30 }}
            onChange={(e) => {
              setSelectedUser(e.currentTarget.value);
              setPassword("");
            }}
          >
            <option></option>
            {Object.entries(existingUsers).map(([key, user]) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUser && (
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
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </>
      )}
      <SubmitButton>Submit</SubmitButton>
      <p>
        {register ? "Not a member?" : "Already a member?"}{" "}
        <InlineButton
          onClick={(event: MouseEvent) => {
            event.preventDefault();
            setRegister((signUp) => !signUp);
          }}
        >
          {register ? "Login" : "Sign Up"}
        </InlineButton>
      </p>
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
  border: 1px solid white;
  color: #949494;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px 5px 10px;
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
