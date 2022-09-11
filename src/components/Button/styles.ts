import styled from 'styled-components';

export const ButtonRoot = styled.button`
  border-width: 1px;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  transition: background-color .3s ease;
  
  &:hover {
    cursor: pointer;
  }
  
  &.primary {
    background-color: deepskyblue;
    color: #fff;
    
    &:hover {
      background-color: lightskyblue;
    }
    
    &:active {
      background-color: deepskyblue;
    }
  }
  
  &.default {
    background-color: #fff;
    color: #444;
    border: 1px solid #e9e9e9;
    
    &:hover {
      background-color: whitesmoke;
    }
    
    &:active {
      background-color: #fff;
    }
  }
`;
