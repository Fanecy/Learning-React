import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 30px;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 20px;
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 20px;
    `}
`;

export default Heading;
