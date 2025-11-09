import { getShapeBounds } from '@/lib';
import { Shape } from '@/types';
import { ReactNode, useMemo } from 'react';
import { Group, Tag, Label, Rect, Text } from 'react-konva';

interface BoundingBoxProps {
  children: ReactNode;
  shape: Shape;
  username?: string;
  showBound: boolean;
}

export const BoundingBox = ({
  children,
  shape,
  username,
  showBound,
}: BoundingBoxProps) => {
  return (
    <Group>
      {showBound ? (
        <BoundBoxTransformer shape={shape} username={username} />
      ) : null}
      {children}
    </Group>
  );
};

const BoundBoxTransformer = ({
  shape,
  username,
}: {
  shape: Shape;
  username?: string;
}) => {
  const bounds = useMemo(() => getShapeBounds(shape), [shape]);
  return (
    <Group>
      <Rect
        x={bounds.minX}
        y={bounds.minY}
        width={bounds.maxX - bounds.minX}
        height={bounds.maxY - bounds.minY}
        stroke={'#fa534a'}
        strokeWidth={2}
        dash={[4, 4]}
        listening={false}
      />
      <Label x={bounds.centerX} y={bounds.topY - 5}>
        <Tag
          pointerDirection='down'
          fill={'#fa534a'}
          pointerWidth={10}
          pointerHeight={10}
          cornerRadius={5}
        />
        <Text text={username} fontSize={12} padding={5} fill={'white'} />
      </Label>
    </Group>
  );
};
