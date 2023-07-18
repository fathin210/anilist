import styled from "@emotion/styled";

const Dashed = styled.hr`
    border-color: ${(props) => props.theme.colors.accent};
    opacity: 0.5;
    margin: 1.5rem 0;
`

export default Dashed