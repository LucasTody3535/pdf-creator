import { fromPixelToMM, fromPixelToPT } from "../conversion/conversion_utils";

export function defineTextSchema(schema: Object, schemaInput: Object, element: HTMLElement, propName: string) {
    const fSize = Number(fromPixelToPT(Number(element.style.fontSize.replaceAll("px", ""))).toFixed(0));
    const computedStyle = getComputedStyle(element).color.match(/\d+/g)!;
    const hex = `#${parseInt(computedStyle[0]).toString(16)}${parseInt(computedStyle[1]).toString(16)}${parseInt(computedStyle[2]).toString(16)}`;
    const isHeading = element instanceof HTMLHeadingElement;
    Object.defineProperty(schema, propName, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: {
            type: "text",
            position: {
                x: Number(element.style.left.replaceAll("mm", "")),
                y: Number(element.style.top.replaceAll("mm", ""))
            },
            fontColor: hex,
            fontSize: fSize,
            width: isHeading ? element.offsetWidth : fromPixelToMM(element.offsetWidth),
            height: isHeading ? element.offsetHeight : fromPixelToMM(element.offsetHeight),
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
                x: Number(element.style.left.replaceAll("mm", "")),
                y: Number(element.style.top.replaceAll("mm", ""))
            },
            width: Number(element.style.width.replaceAll("mm", "")),
            height: Number(element.style.height.replaceAll("mm", ""))
        },
    });
    Object.defineProperty(schemaInput, propName, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: element.src
    });
}