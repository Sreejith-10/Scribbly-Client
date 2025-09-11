import { useBoardStore, useToolbarStore } from '@/stores/canvas';
import { ColorPicker } from './properties/colorpicker';
import { ActionType } from '@/types';
import { LineThickness } from './properties/linethickness';
import { LayerButtons } from './properties/layerbuttons';

type PropertyType =
  | 'backgroundColor'
  | 'foregroundColor'
  | 'layers'
  | 'lineThickness';

const ActionProperties: Record<
  ActionType,
  Partial<Record<PropertyType, boolean>>
> = {
  free: {},
  select: {},
  rectangle: {
    backgroundColor: true,
    foregroundColor: true,
    lineThickness: true,
  },
  circle: {
    backgroundColor: true,
    foregroundColor: true,
    lineThickness: true,
  },
  diamond: {},
  arrow: {
    foregroundColor: true,
  },
  pencil: {
    foregroundColor: true,
  },
  image: {},
  line: {},
  eraser: {},
  text: {},
};

export const Customize = () => {
  const action = useToolbarStore((state) => state.action);
  const stroke = useToolbarStore((state) => state.stroke);
  const setStroke = useToolbarStore((state) => state.setStroke);
  const fill = useToolbarStore((state) => state.fill);
  const setFill = useToolbarStore((state) => state.setFill);
  const strokeWidth = useToolbarStore((state) => state.strokeWidth);
  const setStrokeWidth = useToolbarStore((state) => state.setStrokeWidth);
  const currentSelectedShape = useBoardStore(
    (state) => state.currentShapeSelected,
  );

  const { currentShapeSelected } = useBoardStore()

  const properties = Object.keys(ActionProperties[action]);

  return (
    <div className='bg-secondary @container-normal flex h-fit items-center gap-5 rounded-md border p-3 px-5 shadow-md'>
      {action === 'select' && currentSelectedShape ? (
        <>
          <LayerButtons />
          {Object.keys(
            ActionProperties[currentSelectedShape.type],
          )?.map((prop) => {
            switch (prop) {
              case 'backgroundColor':
                return (
                  <div key={prop}>
                    <ColorPicker
                      title='Background'
                      defaultColor={
                        currentSelectedShape.stroke as string
                      }
                      onChangeHandler={(color) => {
                        setStroke(color);
                      }}
                    />
                  </div>
                );
              case 'foregroundColor':
                return (
                  <div key={prop}>
                    <ColorPicker
                      title='Foreground'
                      defaultColor={
                        currentSelectedShape.fill as string
                      }
                      onChangeHandler={(color) => {
                        setFill(color);
                      }}
                    />
                  </div>
                );
              case 'lineThickness':
                return (
                  <div key={prop}>
                    <LineThickness
                      thickness={
                        currentSelectedShape.strokeWidth!
                      }
                    />
                  </div>
                );
              case 'layers':
                return (
                  <div key={prop}>
                    <LayerButtons />
                  </div>
                );
              default:
                return null;
            }
          })}
        </>
      ) : (
        properties?.map((prop) => {
          switch (prop) {
            case 'backgroundColor':
              return (
                <div key={prop}>
                  <ColorPicker
                    title='Background'
                    defaultColor={stroke}
                    onChangeHandler={(color) =>
                      setFill(color)
                    }
                  />
                </div>
              );
            case 'foregroundColor':
              return (
                <div key={prop}>
                  <ColorPicker
                    title='Foreground'
                    defaultColor={fill}
                    onChangeHandler={(color) =>
                      setStroke(color)
                    }
                  />
                </div>
              );
            case 'lineThickness':
              return (
                <div key={prop}>
                  <LineThickness thickness={strokeWidth} />
                </div>
              );
            case 'layers':
              return (
                <div key={prop}>
                  <LayerButtons />
                </div>
              );
            default:
              return null;
          }
        })
      )}
    </div>
  );
};
