import styled from 'styled-components';
import bg from '../../assets/osu-logo-triangles.svg';
import osu from '../../assets/osu-logo-white.png';

export const LogoWrapper = styled.div`
  height: 40px;
  width: 40px;
  position: relative;
  
  &:hover {
    cursor: pointer;
    
    .nav-logo {
      transform: scale(1.11);

      &.nav-logo-bg {
        opacity: 1;
      }
    }
  }
  
  .nav-logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${osu});
    transition: all .1s ease-in-out;
    background-repeat: no-repeat;
    background-size: contain;

    &.nav-logo-bg {
      background-image: url(${bg});
      opacity: 0;
    }
  }
`;
