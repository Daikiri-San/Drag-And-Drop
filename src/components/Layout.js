import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Layout = ({ children }) => <Container>{children}</Container>;

export default Layout;
