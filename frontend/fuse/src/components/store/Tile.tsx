import React from 'react';
import useGridStore from '../../state/itemStore';

interface TileProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

const Tile: React.FC<TileProps> = ({ columnIndex, rowIndex, style }) => {
  // Access grid state using Zustand
  const block = useGridStore((state) => state.grid[`${rowIndex}-${columnIndex}`]);
  const setTile = useGridStore((state) => state.setTile);

  // Function to handle tile clicks
  const handleTileClick = () => {
    // Toggle the block between a tree emoji and null
    setTile(rowIndex, columnIndex, block === '🌲' ? null : '🌲');
  };

  return (
    <div
      style={style}
      className={`flex items-center justify-center ${
        block ? 'bg-green-300' : 'bg-gray-200'
      } border border-gray-400 cursor-pointer`}
      onClick={handleTileClick}
    >
      {block}
    </div>
  );
};

export default Tile;
