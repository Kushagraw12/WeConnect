import React from 'react';
import './StartButton.css';

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */
export default function StartButton(props) {
  return (
    <button
      className="start-button"
      disabled={props.disabled}
      onClick={props.onClick} //{() => {
      //   createCall(name).then((url) => startJoiningCall(url));
      // }
    >
      Click to start a call
    </button>
  );
}
