declare module '*.module.sass' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.xml' {
    const content: any;
    export default content;
}