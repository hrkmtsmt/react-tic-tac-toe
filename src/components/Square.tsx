import React from 'react';
import { X, Circle } from 'react-feather';

type Props = React.ComponentProps<'button'> & {
  isPrecedence: boolean | null;
}

export const Square: React.FC<Props> = (props) => {
  if (props.isPrecedence === null) {
    return <button value={props.value} onClick={props.onClick} style={{ width: 80, height: 80 }} />;
  }

  return (
    <button { ...props } style={{ width: 80, height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {props.isPrecedence ? <Circle style={{ pointerEvents: 'none' }} /> : <X style={{ pointerEvents: 'none' }} />}
    </button>
  );
}