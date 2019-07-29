import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import '@components/Button';
import '@styles/application.scss';

const INIT_STATE = {
  board: Array(9).fill(''),
  turn: 'x',
  endGame: false,
  winner: null
};

function Index() {
  const [turn, setTurn] = useState(INIT_STATE.turn);
  const [board, setBoard] = useState(INIT_STATE.board);
  const [isEnd, setIsEnd] = useState(INIT_STATE.endGame);
  const [winner, setWinner] = useState(INIT_STATE.winner);

  const _checkWiner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const player = _checkWiner();

    if (player) {
      setWinner(player);
      setIsEnd(true);
    } else {
      setIsEnd(board.filter(x => x === '').length === 0);
    }
  }, [board]);

  const onReset = () => {
    window.location.reload();
  };

  const onPlay = e => {
    const _turn = turn === 'x' ? 'o' : 'x';
    const $e = e.target;

    if ($e.dataset.state === 'allow') {
      const _board = [...board, ...[]];

      _board[Number($e.dataset.square)] = _turn;
      setBoard(_board);

      $e.innerText = _turn;
      $e.dataset.state = 'disable';
      setTurn(_turn);
    }
  };

  return (
    <React.Fragment>
      <div className="Game">
        <h2>Tic Tac Toe</h2>
        <div className="Game__board">
          {Array.from({ length: board.length }, (_, i) => (
            <button
              key={i}
              data-state="allow"
              data-square={i}
              className={`Game__button Player--${board[i]}`}
              onClick={onPlay}
              disabled={isEnd}
            ></button>
          ))}
        </div>

        {winner && isEnd && (
          <div className="Game__message">
            <div>
              {' '}
              The winner player is:{' '}
              <span className={`Player Player--${winner}`}>{winner}</span>{' '}
            </div>
          </div>
        )}
        {isEnd && (
          <div className="Game__message">
            <button
              className="Button"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Index;
