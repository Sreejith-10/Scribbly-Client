import { ActionType, Shape } from '@/types';

export const getShapeBounds = (
  shape: Shape,
): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  centerX: number;
  centerY: number;
  topY: number;
} => {
  if (!shape)
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      centerX: 0,
      centerY: 0,
      topY: 0,
    };

  const padding = 5;

  switch (shape.type) {
    case ActionType.RECTANGLE:
      return {
        minX: (shape.x ?? 0) - padding,
        maxX: (shape.x ?? 0) + (shape.width ?? 0) + padding,
        minY: (shape.y ?? 0) - padding,
        maxY: (shape.y ?? 0) + (shape.height ?? 0) + padding,
        centerX: (shape.x ?? 0) + (shape.width ?? 0) / 2,
        centerY: (shape.y ?? 0) + (shape.height ?? 0) / 2,
        topY: (shape.y ?? 0) - padding,
      };

    case ActionType.CIRCLE:
      return {
        minX: (shape.x ?? 0) - shape.radius - padding,
        maxX: (shape.x ?? 0) + shape.radius + padding,
        minY: (shape.y ?? 0) - shape.radius - padding,
        maxY: (shape.y ?? 0) + shape.radius + padding,
        centerX: shape.x ?? 0,
        centerY: shape.y ?? 0,
        topY: (shape.y ?? 0) - shape.radius - padding,
      };

    case 'line':
    case 'arrow':
    case 'pencil': {
      const points = shape.points || [];
      if (points.length === 0) {
        return {
          minX: 0,
          maxX: 0,
          minY: 0,
          maxY: 0,
          centerX: 0,
          centerY: 0,
          topY: 0,
        };
      }

      let minX = points[0];
      let maxX = points[0];
      let minY = points[1];
      let maxY = points[1];

      for (let i = 0; i < points.length; i += 2) {
        const x = points[i];
        const y = points[i + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }

      const strokeWidth = shape.strokeWidth || 2;
      const strokePadding = strokeWidth / 2;

      return {
        minX: minX - padding - strokePadding,
        maxX: maxX + padding + strokePadding,
        minY: minY - padding - strokePadding,
        maxY: maxY + padding + strokePadding,
        centerX: minX + (maxX - minX) / 2,
        centerY: minY + (maxY - minY) / 2,
        topY: minY - padding - strokePadding,
      };
    }

    case 'text': {
      const strokeWidth = shape.strokeWidth || 0;
      const fontSize = shape.fontSize || 16;

      const text = shape.text || '';
      const estimatedWidth = text.length * fontSize * 0.6;
      const estimatedHeight = fontSize * 1.2;

      return {
        minX: (shape.x ?? 0) - padding - strokeWidth,
        maxX: (shape.x ?? 0) + estimatedWidth + padding + strokeWidth,
        minY: (shape.y ?? 0) - padding - strokeWidth,
        maxY: (shape.y ?? 0) + estimatedHeight + padding + strokeWidth,
        centerX: (shape.x ?? 0) + estimatedWidth / 2,
        centerY: (shape.y ?? 0) + estimatedHeight / 2,
        topY: (shape.y ?? 0) - padding - strokeWidth,
      };
    }

    default:
      return {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
        centerX: 0,
        centerY: 0,
        topY: 0,
      };
  }
};
