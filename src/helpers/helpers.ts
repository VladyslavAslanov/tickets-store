export function changeCursorStyle(ref: any, type: string) {
    if (ref.current) {
        ref.current.container().style.cursor = type;
    }
}