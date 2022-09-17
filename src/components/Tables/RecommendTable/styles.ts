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

export const CoverImg = styled.img`
  object-fit: contain;
  height: 32px;
`;

export const TableContainer = styled.div`
  margin-bottom: 80px;
`;

export const MapNameWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media screen and (max-width: 1920px) and (min-width: 1600px) {
    width: calc(100vw - 1072px - 80px);
  }

  @media screen and (max-width: 1600px) and (min-width: 1360px) {
    width: calc(100vw - 880px - 80px);
  }

  @media screen and (max-width: 1360px) {
    width: 400px;
  }
  
  a.title-text {
    max-width: calc(100% - 116px - 8px - 14px - 8px);

    span {
      max-width: 100%;
      display: block;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }  
`;
