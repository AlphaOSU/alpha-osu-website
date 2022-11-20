import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const MainWrapper = styled.div`
  width: 100%;
  margin: 60px auto;
  box-sizing: border-box;
  padding: 20px 40px 120px;

  @media screen and (min-width: 720px) {
    padding: 20px 40px 120px;
  }

  @media screen and (max-width: 720px) {
    padding: 20px 5px 120px;
  }
`;

export const SpinWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
