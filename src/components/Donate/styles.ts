import styled from 'styled-components';

export const Container = styled.div`
  .container {
    margin-bottom: 24px;
    border-radius: 8px;
    color: #1890ff;
    padding: 12px 0;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .text {
      margin-left: 6px;
      margin-right: 20px;
      color: red;
    }

    &:hover {
      cursor: pointer;
    }

    .progress-bar {
      margin: 0 20px;
      flex: 1;
      background-color: #1890ff25;
      height: 10px;
      border-radius: 5px;
      
      .active {
        background-color: #1890ff;
        border-radius: 5px;
        height: 10px;
        animation: load 3s;
        position: relative;
        overflow: hidden;

        .animate-dot {
          position: absolute;
          width: 100%;
          height: 10px;
          background-image: linear-gradient(90deg, #FFFFFF00 0%, #FFFFFF 50%, #FFFFFF00 100%); ;
          animation: gogo 1.5s infinite ease;
          
          @keyframes gogo {
            from {
              left: -100%;
            }
            to {
              left: 100%;
            }
          }
        }
      }
      
      .percent-text {
        margin-top: 4px;
        font-size: 16px;
      }
    }
  }
`;
