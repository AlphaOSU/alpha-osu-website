import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 160px;
  flex-direction: column;
  
  .title {
    text-align: center;
    font-size: 48px;
    color: #1890ff;
  }
  
  .description {
    font-size: 13PX;
    margin-top: 25px;
    margin-bottom: 80px;
    color: #1890ff;
  }
  
  .user-history-title {
    margin: 20px 0 5px;
    font-size: 20px;
  }
  
  .user-history {
    margin-top: 5px;
    max-width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
    .user-tag {
      margin: 5px;
    }
    
    .user-tag:hover {
      cursor: pointer;
    }
  }
`;
