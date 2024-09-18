import React from 'react';
import styled from '@emotion/styled';
import { Button } from '..';
import { IoMdClose } from "react-icons/io"
import { Link } from 'react-router-dom';

interface DrawerProps {
    isOpen: boolean;
    toggleDrawer: () => void;
}

const DrawerWrapper = styled.div<{ isOpen: boolean }>`
  width: 300px;
  height: 100vh;
  background-color: #19253f;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-300px')};
  transition: left 0.3s ease-in-out;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

const OutsideLayerWrapper = styled.div<{ isOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: .5;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-100vw')};
  z-index: 9990;
  display: flex;
  flex-direction: column;
`;

const FlexWrapper = styled.div`
    display: flex;
    float: right;
    padding: 1rem;
    font-size: 24px;   
    justify-content: end; 
`;

const ButtonWrapper = styled.div`
    width: 40px;
`

const DrawerContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const CustomLink = styled(Link)`
    font-size: 24px;
    color: ${(props) => props.theme.colors.white}
`

const routes = [
    {
        path: "/",
        title: "Home"
    },
    {
        path: "collection-list",
        title: "Collection List"
    },
]


const Drawer: React.FC<DrawerProps> = ({ isOpen = false, toggleDrawer }) => {

    return (
        <>
            <DrawerWrapper isOpen={isOpen}>
                <FlexWrapper>
                    <ButtonWrapper>
                        <Button color="danger" onClick={toggleDrawer}><IoMdClose /></Button>
                    </ButtonWrapper>
                </FlexWrapper>
                <DrawerContent>
                    {routes.map((item) => <CustomLink key={item.path} onClick={toggleDrawer} to={item.path}>{item.title}</CustomLink>)}
                </DrawerContent>
            </DrawerWrapper>
            <OutsideLayerWrapper isOpen={isOpen} onClick={toggleDrawer} />
        </>
    );
};

export default Drawer;
