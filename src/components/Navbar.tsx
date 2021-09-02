import { FC } from "react";
import styled from "styled-components";

export const Navbar: FC<{ loggedIn?: boolean; onLogoutClick?(): unknown }> = ({
  loggedIn = false,
  onLogoutClick,
}) => {
  return (
    <Bar>
      {loggedIn && (
        <button style={{ marginRight: 20 }} onClick={onLogoutClick}>
          Sign Out
        </button>
      )}
    </Bar>
  );
};

const Bar = styled.div`
  width: 100%;
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 25px 0px;
  position: absolute;
  top: 0;
`;
