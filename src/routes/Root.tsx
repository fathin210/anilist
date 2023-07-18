import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Header";
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 1.5rem
`

export default function Root() {
    return (
        <Container>
            <Navbar />
            <div id="detail">
                <Outlet />
            </div>
        </Container>
    );
}