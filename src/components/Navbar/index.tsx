import styled from "@emotion/styled";
import { CgMenuGridO } from "react-icons/cg"
import { Button } from "..";
import { Link } from "react-router-dom";

interface NavbarProps {
    toggleDrawer: () => void
}

const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    max-width: 1024px;
    margin: auto;
    width: 100%;
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

const Navbar: React.FC<NavbarProps> = ({ toggleDrawer, ...props }) => {
    return <NavWrapper>
        <Link to="/">
            <Title>Ani
                <AccentTitle>
                    List
                </AccentTitle>
            </Title>
        </Link>
        <MenuWrapper>
            <Button onClick={toggleDrawer} variant="contained">
                <CgMenuGridO />
            </Button>
        </MenuWrapper>
    </NavWrapper>
}

export default Navbar;