import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  
  .footer-wrapper {
    width: 1080px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 25px;
  }
`;
