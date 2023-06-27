import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f0f0;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Main = styled.main`
  flex-grow: 1;
  display: flex;
`;
