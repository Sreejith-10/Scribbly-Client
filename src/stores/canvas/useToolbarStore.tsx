import { ActionType } from '@/types/canvas.type';
import { IToolbar } from '@/types/toolbar.type';
import { create } from 'zustand';

interface IToolbarStore extends IToolbar {
  resetToolbar: () => void;
}

export const useToolbarStore = create<IToolbarStore>((set) => ({
  action: ActionType.SELECT,
  setAction: (action) => {
    set({ action });
  },
  stroke: '#000',
  setStroke: (stroke) => {
    set({ stroke });
  },
  fill: '#ffffff10',
  setFill: (fill) => {
    set({ fill });
  },
  strokeWidth: 5,
  setStrokeWidth: (strokeW) => {
    set({ strokeWidth: strokeW });
  },
  borderRadius: 1,
  setBorderRadius: (borderR) => {
    set({ borderRadius: borderR });
  },
  isShapeSelected: false,
  setIsShapeSelected: (selected) => {
    set({ isShapeSelected: selected });
  },
  toolSelected: false,
  setToolSelected: (selected) => {
    set({ toolSelected: selected });
  },
  resetToolbar: () => {
    set({
      stroke: '#000',
      fill: '#ffffff10',
      strokeWidth: 5,
      borderRadius: 1,
    });
  },
}));
