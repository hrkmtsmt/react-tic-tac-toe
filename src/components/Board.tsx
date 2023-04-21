import React from 'react';

type Props = {
  children: React.ReactNode;
}

export const Board: React.FC<Props> = (props) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)' }}>
      {props.children}
    </div>
  );
}