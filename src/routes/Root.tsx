import { Outlet } from "react-router-dom";
import styled from '@emotion/styled';
import { Drawer, Loader, Navbar } from "../components";
import { Suspense, useState } from "react";

const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default function Root() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleToggleDrawer = () => setIsOpen(!isOpen)

    return (
        <Container>
            <Navbar toggleDrawer={handleToggleDrawer} />
            <Drawer toggleDrawer={handleToggleDrawer} isOpen={isOpen} />
            <Suspense fallback={<Loader />}>
                <div id="detail">
                    <Outlet />
                </div>
            </Suspense>
        </Container>
    );
}