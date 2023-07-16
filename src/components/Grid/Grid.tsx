import styled from "@emotion/styled";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 16px;
  gap: 1rem;
  @media (min-width: 576px) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 768px) {
    grid-template-columns: auto auto auto auto auto;
  }
  @media (min-width: 1200px) {
    grid-template-columns: auto auto auto auto auto auto auto;
  }
`;

export default StyledGrid;
