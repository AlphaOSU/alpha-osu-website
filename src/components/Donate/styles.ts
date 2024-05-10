import styled from 'styled-components';

export const Container = styled.div`
  .container {
    margin: 12px 0;
    border-radius: 8px;
    color: #1890ff;
    padding: 12px 0;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .text {
      margin-left: 6px;
      margin-right: 6px;
    }

    &:hover {
      cursor: pointer;
    }

    .progress-bar {
      margin: 0 20px;
      flex: 1;
      background-color: #1890ff25;
      height: 6px;
      border-radius: 3px;

      .active {
        width: 50%;
        background-color: #1890ff;
        border-radius: 3px;
        height: 6px;
      }
    }
  }
`;
