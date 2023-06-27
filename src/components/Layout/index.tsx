import React, {PropsWithChildren} from 'react';
import {Sidebar} from './Sidebar';
import {StyledLayout, Main} from './styles';

export const AppLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <StyledLayout>
      <Sidebar />
      <Main>{children}</Main>
    </StyledLayout>
  );
};
