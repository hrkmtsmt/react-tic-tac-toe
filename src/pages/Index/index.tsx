import React, { useReducer } from 'react';
import produce from 'immer';
import { Square } from '@src/components/Square';
import { Board } from '@src/components/Board';

type InitialState = {
  squares: Array<{
    value: string;
    isPrecedence: boolean | null;
  }>;
  isPrecedence: boolean;
}

const initialState: InitialState = {
  squares: [...Array(9)].map((_, index) => {
    return {
      value: (index + 1).toString(),
      isPrecedence: null,
    };
  }),
  isPrecedence: true,
};

const ACTION_TYPES = {
  CLICK: 'click',
  RESET: 'reset'
} as const;

type ClickAction = {
  type: typeof ACTION_TYPES.CLICK;
  payload: string;
}

type ResetAction = {
  type: typeof ACTION_TYPES.RESET;
  payload: null;
}

type Action = ClickAction | ResetAction;

const winnerValues = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7']
];



const reducer = (state: InitialState, action: Action) => {
  if (ACTION_TYPES.CLICK === action.type) {
    return produce(state, (draftState) => {
      const square = state.squares.find((square) => square.value === action.payload);
      if (!square) {
        return;
      }
      if (square.isPrecedence !== null) {
        return;
      }
      draftState.squares = draftState.squares.map((_square) => {
        if (_square.value === action.payload) {
          return { ..._square, isPrecedence: draftState.isPrecedence };
        }
        return _square;
      });
      draftState.isPrecedence = !draftState.isPrecedence;
    })
  }
  if (ACTION_TYPES.RESET === action.type) {
    return produce(state, (draftState) => {
      draftState.squares = draftState.squares.map((square) => {
        return { ...square, isPrecedence: null }
      });
      draftState.isPrecedence = true;
    })
  }
  throw new Error('Error!');
}

export const Index: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch({ type: ACTION_TYPES.CLICK, payload: e.currentTarget.value })
  }
  
  const onClickReset = () => {
    dispatch({ type: ACTION_TYPES.RESET, payload: null })
  }

  return (
    <div>
      <Board>
        {state.squares.map((square) => (
          <Square isPrecedence={square.isPrecedence} key={square.value} value={square.value} onClick={onClick} />
        ))}
      </Board>
      <button onClick={onClickReset}>Reset</button>
    </div>
  )
};
