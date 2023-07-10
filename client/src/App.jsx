import React, { useState, useEffect } from 'react';
import WaitRoom from './components/WaitRoom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <>
      {socket && <WaitRoom socket={socket} />}
    </>
  );
}

export default App;
