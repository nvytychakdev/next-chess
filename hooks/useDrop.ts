import { useEffect, useRef } from "react";

export interface Drop {
  onDrop?: () => void;
  onDragOver?: () => void;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
}

const useDrop = <Element extends HTMLElement>({
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
}: Drop) => {
  const ref = useRef<Element>(null);

  useEffect(() => {
    const refElement = ref.current;

    /**
     * Drag Event.
     *
     * @param event
     */
    const onDropEvent = (event: Event) => {
      onDrop ? onDrop() : null;
      event.preventDefault();
    };

    /**
     * Drag Over Event.
     * Prevent default event to allow elements to be dragged into `dragRef`
     *
     * @param event
     */
    const onDragOverEvent = (event: Event) => {
      onDragOver ? onDragOver() : null;
      event.preventDefault();
    };

    /**
     * Drag Enter Event.
     * Prevent default event to allow elements to be dragged into `dragRef`
     *
     * @param event
     */
    const onDragEnterEvent = (event: Event) => {
      onDragEnter ? onDragEnter() : null;
      event.preventDefault();
    };

    /**
     * Drag Leave Event.
     * Prevent default event to allow elements to be dragged into `dragRef`
     *
     * @param event
     */
    const onDragLeaveEvent = (event: Event) => {
      onDragLeave ? onDragLeave() : null;
      event.preventDefault();
    };

    refElement?.addEventListener("drop", onDropEvent);
    refElement?.addEventListener("dragover", onDragOverEvent);
    refElement?.addEventListener("dragenter", onDragEnterEvent);
    refElement?.addEventListener("dragleave", onDragLeaveEvent);
    return () => {
      refElement?.removeEventListener("drop", onDropEvent);
      refElement?.removeEventListener("dragover", onDragOverEvent);
      refElement?.removeEventListener("dragenter", onDragEnterEvent);
      refElement?.removeEventListener("dragleave", onDragLeaveEvent);
    };
  });

  return ref;
};

export { useDrop };
