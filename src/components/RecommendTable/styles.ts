import styled from 'styled-components';

export const DifficultyBadge = styled.div<{
  color: string;
  backgroundColor: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .rate-content {
    min-width: 20px;
    height: 20px;
    white-space: nowrap;
    padding: 0 10px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 800;
    border-radius: 10px;
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
  }
`;

export const ModImg = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

export const TableContainer = styled.div`
`;
