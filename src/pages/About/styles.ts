import styled from 'styled-components';

export const Container = styled.div`
  margin: 80px auto;
  max-width: 1080px;
  
  div.ant-typography {
    line-height: 32px;
    font-size: 18px;
    text-indent: 2em;
  }
  
  div.about-content {
    margin: 20px;
  }
  
  div.useful-link-title {
    margin-top: 80px;
    font-size: 18px;
    font-weight: 500;
    line-height: 60px;
    width: 100%;
    text-align: center;
  }
  
  div.similar-system {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
