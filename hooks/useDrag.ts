import { useEffect, useRef } from "react";

export interface Drag {
  onDrag?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
  onDrop?: () => void;
}

const useDrag = ({
  onDrag,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: Drag) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refElement = ref.current;

    // empty image
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

    // DRAG
    const onDragEvent = (event: Event) => {
      // console.log("Drag", event);
      if (event instanceof DragEvent) {
        if (event.target instanceof HTMLDivElement) {
          const div = event.target;
          // console.log(event.screenX, event.screenY);
          const box = div.getBoundingClientRect();
          div.style.zIndex = "2";
          div.style.top = `${event.clientY - box.height / 2}px`;
          div.style.left = `${event.clientX - box.width / 2}px`;
        }
      }
      onDrag ? onDrag() : null;
    };

    // START
    const onDragStartEvent = (event: Event) => {
      console.log("Drag Start", event);
      event.stopPropagation();
      if (event instanceof DragEvent) {
        if (event.dataTransfer) {
          event.dataTransfer?.clearData();
          event.dataTransfer?.setDragImage(img, 0, 0);
          event.dataTransfer.effectAllowed = "move";
        }
        if (event.target instanceof HTMLDivElement) {
          const div = event.target;
          const box = div.getBoundingClientRect();
          div.style.cursor = "grabbing";
          div.style.position = "fixed";
          div.style.width = `${box.width}px`;
          div.style.height = `${box.height}px`;
          // required to click trough the element once drag started
          requestAnimationFrame(() => {
            div.style.pointerEvents = "none";
          });
        }
      }

      onDragStart ? onDragStart() : null;
    };

    // END
    const onDragEndEvent = (event: Event) => {
      // console.log("Drag End", event);
      if (event instanceof DragEvent) {
        if (event.target instanceof HTMLDivElement) {
          const div = event.target;
          div.style.top = "";
          div.style.left = "";
          div.style.zIndex = "";
          div.style.cursor = "";
          div.style.position = "";
          div.style.pointerEvents = "all";
        }
      }
      onDragEnd ? onDragEnd() : null;
    };

    // OVER
    const onDragOverEvent = (event: Event) => {
      event.preventDefault();
      // console.log("Drag Over", event);
      onDragOver ? onDragOver() : null;
    };
    // const onDropEvent = (event: Event) => {
    //   console.log("Drop", event);

    //   event.preventDefault();
    //   onDrop ? onDrop() : null;
    // };

    refElement?.addEventListener("dragstart", onDragStartEvent);
    refElement?.addEventListener("drag", onDragEvent);
    refElement?.addEventListener("dragend", onDragEndEvent);
    refElement?.addEventListener("dragover", onDragOverEvent);
    // refElement?.addEventListener("drop", onDropEvent);
    return () => {
      refElement?.removeEventListener("dragstart", onDragStartEvent);
      refElement?.removeEventListener("drag", onDragEvent);
      refElement?.removeEventListener("dragend", onDragEndEvent);
      refElement?.removeEventListener("dragover", onDragOverEvent);
      // refElement?.removeEventListener("drop", onDropEvent);
    };
  });

  return ref;
};

export { useDrag };
