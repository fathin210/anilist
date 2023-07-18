import styled from "@emotion/styled";
import { CgMenuGridO } from "react-icons/cg"
import { Button } from "..";
import { Link } from "react-router-dom";


const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
`

const Title = styled.p`
  color: white;
  margin: 0;
  font-weight: bold;
  font-size: 36px;
  @media (min-width: 546px){
      font-size: 48px;
  }
`;

const AccentTitle = styled.span`
  color: ${(props) => props.theme.colors.accent}
`

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navbar = () => {
    return <NavWrapper>
        <Link to="/">
            <Title>Ani
                <AccentTitle>
                    List
                </AccentTitle>
            </Title>
        </Link>
        <MenuWrapper>
            <Button variant="contained">
                <CgMenuGridO />
            </Button>
        </MenuWrapper>
    </NavWrapper>
}

export default Navbar;