import styled from "@emotion/styled";

const TextButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 12px;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  @media (min-width: 576px){
    font-size: 16px;
  }
`;

const ContainedButton = styled.button`
  background: ${(props) => props.color === "primary" ? props.theme.colors.primary : props.color === "secondary" ? props.theme.colors.secondary : props.color === "accent" ? props.theme.colors.accent : props.color};
  color: ${(props) => props.theme.colors.white};
  font-size: 11px;
  font-weight: 700;
  padding: .6rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-transform: uppercase;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px){
    font-size: 16px;
    padding: 1rem;
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "contained" | "text";
  color?: "primary" | "secondary" | "accent";
}

const Button: React.FC<IProps> = ({ children, variant = "contained", color = "primary", ...rest }) => {
  if (variant === "contained") {
    return (
      <ContainedButton color={color} {...rest} data-testid="contained-button">
        {children}
      </ContainedButton>
    );
  } else {
    return (
      <TextButton {...rest} data-testid="text-button">
        {children}
      </TextButton>
    );
  }
};

export default Button;
