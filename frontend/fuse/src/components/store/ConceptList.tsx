import { create } from 'zustand';

type GridState = {
  grid: Record<string, string | null>;
  setTile: (row: number, col: number, item: string | null) => void; // Action to update a tile's state
};

const useGridStore = create<GridState>((set) => ({
  // Initial state of the grid
  grid: {},

  setTile: (row, col, item) => {
    set((state) => {
      const newGrid = { ...state.grid };
      newGrid[`${row}-${col}`] = item;   
      return { grid: newGrid };         
    });
  },
}));

export default useGridStore;
