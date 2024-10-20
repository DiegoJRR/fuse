"use client"
import React from 'react';
// Import the FixedSizeGrid component from react-window
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import Tile from '../ui/Tile';

// Define the types for GridComponentProps
interface GridComponentProps {
  width: number;         // Width of the grid container
  height: number;        // Height of the grid container
  columnCount: number;   // Number of columns in the grid
  rowCount: number;      // Number of rows in the grid
  tileSize: number;      // Size of each tile (both width and height)
}

const GridComponent: React.FC<GridComponentProps> = ({
  width,
  height,
  columnCount,
  rowCount,
  tileSize,
}) => {
  // Define a child renderer function with the correct types
  const CellRenderer: React.FC<GridChildComponentProps> = ({
    columnIndex,
    rowIndex,
    style,
  }) => (
    <Tile
      columnIndex={columnIndex}
      rowIndex={rowIndex}
      style={style}
    />
  );

  return (
    <Grid
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={tileSize}
      rowHeight={tileSize}
      height={height}
      width={width}
      className="bg-gray-100"
    >
      {CellRenderer}
    </Grid>
  );
};

export default GridComponent;
