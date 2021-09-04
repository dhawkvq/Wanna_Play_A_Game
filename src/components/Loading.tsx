import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as FilterSrc } from "../images/filter.svg";
import { ReactComponent as DropletSrc } from "../images/droplet.svg";

export const Loading: FC = () => (
  <Housing>
    <Filter />
    <Droplet />
  </Housing>
);

const Housing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Filter = styled(FilterSrc)`
  width: 100px;
  height: 100px;
  stroke-width: 1.25px;
  color: #5c5c5c;
`;

const drip = keyframes`
  from {
    opacity: 100%;
    color: #fc6262;
  }
  to {
    opacity: 10%;
    transform: translateY(50px);
  }
`;

const Droplet = styled(DropletSrc)`
  transform: translateY(-20px);
  animation: 1.2s ${drip} infinite;
  color: #6262ff;
`;
