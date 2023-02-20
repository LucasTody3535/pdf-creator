interface IEventHandlers {
    onDragEnter: (ev: DragEvent) => void,
    onDragEnd: (ev: DragEvent) => void,
    onDragOver: (ev: DragEvent) => void,
    onDrop: (ev: DragEvent) => void,
}
type Effect = "link" | "none" | "copy" | "move" | "copyLink" |
"copyMove" | "linkMove" | "all" | "uninitialized";

export function useHTMLDropZone(el: HTMLElement, handlers: IEventHandlers) {
    el.removeEventListener("dragenter", handlers.onDragEnter);
    el.removeEventListener("dragover", handlers.onDragOver);
    el.removeEventListener("dragend", handlers.onDragEnd);
    el.removeEventListener("drop", handlers.onDrop);
    el.addEventListener("dragenter", handlers.onDragEnter);
    el.addEventListener("dragover", handlers.onDragOver);
    el.addEventListener("dragend", handlers.onDragEnd);
    el.addEventListener("drop", handlers.onDrop);
}

export function useHTMLDragable(el: HTMLElement, id: string, effectAllowed: Effect) {
    el.draggable = true;
    el.addEventListener("dragstart", (ev: DragEvent) => {
        el.id = id;
        ev.dataTransfer!.effectAllowed = effectAllowed;
        ev.dataTransfer!.setData("text/plain", (ev.currentTarget! as HTMLElement).id);
    });
}
