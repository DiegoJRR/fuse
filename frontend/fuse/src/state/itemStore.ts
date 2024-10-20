import { create } from 'zustand';

// Define the type for draggable items state
type DraggableItem = {
  id: number;
  type: string;
  x: number;
  y: number;
};

// Define the Zustand state type
type ItemState = {
  items: DraggableItem[];  
  addItem: (item: DraggableItem) => void;
  updateItem: (id: number, x: number, y: number) => void; 
  initializeItems: (initialItems: DraggableItem[]) => void; 
};

// Initial list of draggable items
const initialItems: DraggableItem[] = [
  { id: 1, type: 'tree', x: 50, y: 100 },
  { id: 2, type: 'water', x: 200, y: 150 },
  { id: 3, type: 'tree', x: 300, y: 250 },
];

// Create the Zustand store
const useItemStore = create<ItemState>((set) => ({
  items: [],

  // Action to add a new item
  addItem: (item) => {
    set((state) => ({ items: [...state.items, item] }));
  },

  // Action to update item position
  updateItem: (id, x, y) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      ),
    }));
  },

  // Action to initialize items
  initializeItems: (initialItems) => {
    set({ items: initialItems });
  },
}));

// Initialize the items when the app loads
useItemStore.getState().initializeItems(initialItems);

export default useItemStore;
