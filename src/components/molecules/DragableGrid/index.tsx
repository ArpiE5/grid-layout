import { useState, MouseEvent } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { DraggableEvent, DraggableData } from "react-draggable";
import { DragItem, TDragItem } from "../../atoms/DragItem";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const MultiSelectDrag = () => {
  const [items, setItems] = useState<TDragItem[]>([
    {
      id: "item1",
      x: 0,
      y: 0,
      width: 145,
      height: 80,
      isSelected: false,
      color: "blue",
    },
    {
      id: "item2",
      x: 2,
      y: 23,
      width: 145,
      height: 80,
      isSelected: false,
      color: "green",
    },
    {
      id: "item3",
      x: 10,
      y: 150,
      width: 145,
      height: 80,
      isSelected: false,
      color: "red",
    },
    {
      id: "item4",
      x: 165,
      y: 120,
      width: 145,
      height: 80,
      isSelected: false,
      color: "yellow",
    },
  ]);

  const handleDrag = (
    id: string,
    event: DraggableEvent,
    data: DraggableData
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.isSelected) {
          return {
            ...item,
            x: item.x + data.deltaX,
            y: item.y + data.deltaY,
          };
        }
        return item;
      })
    );
  };

  const handleSelect = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      })
    );
  };

  const handleContextMenu = (event: MouseEvent, id: string) => {
    event.preventDefault();

    const selectedItemIndex = items.findIndex((item) => item.id === id);
    if (selectedItemIndex !== -1) {
      const selectedItem = items[selectedItemIndex];
      const updatedItems = items.filter((item) => item.id !== id);

      if (event.button === 2) {
        updatedItems.push(selectedItem);
      } else if (event.button === 0) {
        updatedItems.unshift(selectedItem);
      }

      setItems(updatedItems);
    }
  };

  return (
    <ResponsiveGridLayout>
      {items.map((item) => (
        <DragItem
          key={item.id}
          item={item}
          onSelect={handleSelect}
          onDrag={handleDrag}
          onContextMenu={handleContextMenu}
        />
      ))}
    </ResponsiveGridLayout>
  );
};
