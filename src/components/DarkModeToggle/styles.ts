import styled from 'styled-components';

export const DarkModeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 20px;

  .dark-mode-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 25%;
    cursor: pointer;

    :hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .dark-mode-icon {
    width: 20px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
