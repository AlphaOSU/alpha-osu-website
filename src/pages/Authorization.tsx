import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from '../common/dvaHooks';

export const Authorization: React.FC = ({ children }) => {
  const userMeta = useSelector(state => state.global.userMeta);

  if (!userMeta) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
};
