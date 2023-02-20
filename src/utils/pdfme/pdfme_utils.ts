import { fromPixelToMM } from "../conversion/conversion_utils";

export function defineHeadingSchema(schema: Object, schemaInput: Object, element: HTMLElement, index: number) {
    Object.defineProperty(schema, `heading${index}`, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: {
            type: "text",
            position: {
                x: fromPixelToMM(element.offsetLeft),
                y: fromPixelToMM(element.offsetTop)
            },
            width: element.offsetWidth,
            height: element.offsetHeight
        },
    });
    Object.defineProperty(schemaInput, `heading${index}`, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: element.innerText
    });
}

export function defineImageSchema(schema: Object, schemaInput: Object, element: HTMLImageElement, index: number) {
    Object.defineProperty(schema, `image${index}`, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: {
            type: "image",
            position: {
                x: fromPixelToMM(element.offsetLeft),
                y: fromPixelToMM(element.offsetTop)
            },
            width: fromPixelToMM(element.width),
            height: fromPixelToMM(element.height)
        },
    });
    Object.defineProperty(schemaInput, `image${index}`, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: element.src
    });
}