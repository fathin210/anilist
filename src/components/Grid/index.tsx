import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;
  margin: 10px 0 10px 0;
  @media (min-width: 576px) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 768px) {
    grid-template-columns: auto auto auto auto auto;
  }
  @media (min-width: 1200px) {
    grid-template-columns: auto auto auto auto auto auto;
  }
`;

export default StyledGrid;
