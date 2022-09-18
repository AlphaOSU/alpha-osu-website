import { MathComponent as Tex } from 'mathjax-react';

const i = (tex: string) => {
  return (
    <Tex tex={tex} display={false} />
  );
};

const l = (tex: string) => {
  return (
    <Tex tex={tex} />
  );
};

export { i, l };
