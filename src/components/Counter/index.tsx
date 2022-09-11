import { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { IGlobalState } from '../../models/global';
import { Button } from '../Button';
import { Container } from './styles';

export const Counter = () => {
  const count = useSelector(({ global }: { global: IGlobalState }) => global.currentCount);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch({
      type: 'global/incrementAsync',
    });
  }, [dispatch]);

  return (
    <Container>
      <h2>{count}</h2>
      <p>
        <Button onClick={handleClick}>Click to Increment</Button>
      </p>
    </Container>
  );
};
