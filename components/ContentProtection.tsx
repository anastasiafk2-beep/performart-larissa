"use client";

import { useEffect } from "react";

export default function ContentProtection() {
  useEffect(() => {
    const isEditableElement = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;

      return Boolean(
        target.closest(
          "input, textarea, select, [contenteditable='true'], [data-allow-copy='true']"
        )
      );
    };

    const preventContextMenu = (event: MouseEvent) => {
      if (isEditableElement(event.target)) return;
      event.preventDefault();
    };

    const preventCopy = (event: ClipboardEvent) => {
      if (isEditableElement(event.target)) return;
      event.preventDefault();
    };

    const preventCut = (event: ClipboardEvent) => {
      if (isEditableElement(event.target)) return;
      event.preventDefault();
    };

    const preventDrag = (event: DragEvent) => {
      const target = event.target;

      if (target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    const preventSelection = (event: Event) => {
      if (isEditableElement(event.target)) return;
      event.preventDefault();
    };

    const preventKeyboardCopy = (event: KeyboardEvent) => {
      if (isEditableElement(event.target)) return;

      const key = event.key.toLowerCase();

      if (
        (event.ctrlKey || event.metaKey) &&
        ["c", "x", "a", "s"].includes(key)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCut);
    document.addEventListener("dragstart", preventDrag);
    document.addEventListener("selectstart", preventSelection);
    document.addEventListener("keydown", preventKeyboardCopy);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCut);
      document.removeEventListener("dragstart", preventDrag);
      document.removeEventListener("selectstart", preventSelection);
      document.removeEventListener("keydown", preventKeyboardCopy);
    };
  }, []);

  return null;
}