import { FC, MouseEvent } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

export type TDragItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  color: string;
};

type DragItemProps = {
  item: TDragItem;
  onSelect: (id: string) => void;
  onDrag: (id: string, event: DraggableEvent, data: DraggableData) => void;
  onContextMenu: (event: MouseEvent, id: string) => void;
};

export const DragItem: FC<DragItemProps> = ({
  item,
  onSelect,
  onDrag,
  onContextMenu,
}) => {
  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    onDrag(item.id, event, data);
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    onSelect(item.id);
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    onContextMenu(event, item.id);
  };

  return (
    <Draggable
      bounds="parent"
      position={{ x: item.x, y: item.y }}
      onDrag={handleDrag}
      disabled={!item.isSelected}
    >
      <div
        className={`item ${item.isSelected ? "selected" : ""}`}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{
          width: item.width,
          height: item.height,
          backgroundColor: item.color,
        }}
      >
        {item.id}
      </div>
    </Draggable>
  );
};
