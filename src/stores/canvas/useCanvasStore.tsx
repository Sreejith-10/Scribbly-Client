import { create } from 'zustand';

export interface ICanvasStore {
  zoom: number;
  setZoom: (zoom: number) => void;
  reset: () => void;
}

export const useCanvasStore = create<ICanvasStore>((set) => ({
  zoom: 100,
  setZoom: (zoom) => {
    set({ zoom });
  },
  reset: () => {
    set({ zoom: 100 });
  },
}));
