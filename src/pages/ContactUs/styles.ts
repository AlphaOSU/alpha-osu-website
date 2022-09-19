import styled from 'styled-components';

export const Container = styled.div`
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 1080px;

  .thanks-title {
    margin: 20px;
    font-size: 16px;
    text-align: center;
  }

  .center-title {
    text-align: center;
    font-size: 28px;
    margin: 20px;
  }

  .contact-us-title {
    margin-top: 40px;
    font-size: 28px;
    text-align: center;
  }

  .contact-us-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
