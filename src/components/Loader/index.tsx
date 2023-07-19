import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
}

const getSizeValue = (size: string) => {
    switch (size) {
        case 'small':
            return '30px';
        case 'medium':
            return '40px';
        case 'large':
            return '50px';
        default:
            return '40px';
    }
};

const spin = keyframes`
    to {
      transform: rotate(360deg);
    }
  `;

const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  `;

const LoaderElement = styled.div<LoaderProps>`
    width: ${(props) => getSizeValue(props.size || 'medium')};
    height: ${(props) => getSizeValue(props.size || 'medium')};
    border: 4px solid #f3f3f3;
    border-top-color: ${(props) => props.theme.colors.accent};
    border-radius: 50%;
    animation: ${spin} 1s ease-in-out infinite;
  `;

const Loader: React.FC<LoaderProps> = ({ size }) => {
    return (
        <LoaderContainer>
            <LoaderElement size={size} />
        </LoaderContainer>
    );
};

export default Loader;