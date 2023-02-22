import { fromPixelToMM, fromPixelToPT } from "../conversion/conversion_utils";

export function defineHeadingSchema(schema: Object, schemaInput: Object, element: HTMLElement, propName: string) {
    const fSize = Number(fromPixelToPT(Number(element.style.fontSize.replaceAll("px", ""))).toFixed(0));
    const computedStyle = getComputedStyle(element).color.match(/\d+/g)!;
    const hex = `#${parseInt(computedStyle[0]).toString(16)}${parseInt(computedStyle[1]).toString(16)}${parseInt(computedStyle[2]).toString(16)}`;
    Object.defineProperty(schema, propName, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: {
            type: "text",
            position: {
                x: fromPixelToMM(element.offsetLeft),
                y: fromPixelToMM(element.offsetTop)
            },
            fontColor: hex,
            fontSize: fSize,
            width: element.offsetWidth,
            height: element.offsetHeight
        },
    });
    Object.defineProperty(schemaInput, propName, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: element.innerText
    });
}

export function defineImageSchema(schema: Object, schemaInput: Object, element: HTMLImageElement, propName: string) {
    Object.defineProperty(schema, propName, {
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
    Object.defineProperty(schemaInput, propName, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: element.src
    });
}