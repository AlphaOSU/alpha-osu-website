import React from 'react';
import cls from 'classnames';
import { ButtonRoot } from './styles';

export interface ButtonProps extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>{
  children?: string;
  type?: 'default' | 'primary';
}

export const Button = ({
  children = 'Button',
  type = 'default',
  onClick,
}: ButtonProps) => {
  return (
    <ButtonRoot className={cls(type)} onClick={onClick}>
      {children}
    </ButtonRoot>
  );
};
