import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 40px;
  
  @media screen and (min-width: 720px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
