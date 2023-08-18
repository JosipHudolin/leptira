import React from "react";
import { styled } from "styled-components";

const Button = ({
  children,
  margin = "",
  padding = "",
  onClick = () => null,
  ...rest
}) => {
  return (
    <StyledButton
      $margin={margin}
      $padding={padding}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  color: white;
  background: dodgerblue;
  border: 1px solid dodgerblue;
  border-radius: 5px;
  padding: 10px 20px;
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  transition: 0.3s;

  &:hover {
    background: none;
    color: dodgerblue;
  }
`;
