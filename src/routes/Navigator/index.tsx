import { configResponsive, useResponsive } from 'ahooks';
import { PcNav } from './PcNav';
import { MobileNav } from './MobileNav';

configResponsive({
  showPc: 1280,
});

export const Navigator = () => {
  // only calculate on page loading
  const { showPc } = useResponsive();

  if (showPc) {
    return <PcNav />;
  }

  return <MobileNav />;
};
