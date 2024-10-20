import React, { useState } from 'react';

const Tile = ({ title, emoji, size }) => {
  const [isClicked, setIsClicked] = useState(false);
  const audioRef = React.useRef(new Audio('/sounds/card_slam.wav'));


  const handleClick = async () => {
    setIsClicked(true);
    audioRef.current.currentTime = 0; // Reset the audio to the beginning
    await audioRef.current.play(); // Play the sound

    // Stop the sound after 50 milliseconds
    setTimeout(() => {
      audioRef.current.pause(); // Pause the sound
      audioRef.current.currentTime = 0; // Reset the audio for the next click
      setIsClicked(false);
    }, 80);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        size === 'large' ? 'text-2xl space-x-2.5 py-2.5 px-4' : 'space-x-1.5 px-3 py-1'
      } border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg select-none
      ${isClicked ? 'transform scale-105 transition-transform duration-200 ease-out' : ''}`}
    >
      <span>{emoji}</span>
      <span className="text-black">{title}</span>
    </div>
  );
};

export default Tile;
