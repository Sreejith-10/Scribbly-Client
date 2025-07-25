import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

interface CanvasZoomProps {
  zoom: number;
  setZoom: Dispatch<SetStateAction<Number>>;
}

export const CanvasZoom = ({ zoom, setZoom }: CanvasZoomProps) => {
  return (
    <div>
      <Button>-</Button>
      <span>{zoom}%</span>
      <Button>+</Button>
    </div>
  );
};
