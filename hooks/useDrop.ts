import { useEffect, useRef } from "react";

export interface Drop {
  onDrop?: () => void;
}

const useDrop = ({ onDrop }: Drop) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refElement = ref.current;

    const onDropEvent = (event: Event) => {
      console.log("Drop", event);

      onDrop ? onDrop() : null;
      event.preventDefault();
    };

    refElement?.addEventListener("drop", onDropEvent);
    refElement?.addEventListener("dragover", onDropEvent);
    refElement?.addEventListener("dragenter", onDropEvent);
    return () => {
      refElement?.removeEventListener("drop", onDropEvent);
    };
  });

  return ref;
};

export { useDrop };
