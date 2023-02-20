interface IHeading {
    position: "absolute",
    fontSize: string,
    top: string,
    left: string,
    content: string
}

interface IImage {
    position: "absolute",
    alt: string,
    fontSize: string,
    top: string,
    left: string,
    src: string,
    height: string,
    width: string,
}

export function createHeading(data: IHeading): HTMLElement {
    const heading = document.createElement("h1");
    heading.id = "";
    heading.style.position = data.position;
    heading.style.fontSize = data.fontSize;
    heading.style.top = data.top;
    heading.style.left = data.left;
    heading.innerText = data.content;
    return heading;
}

export function createImage(data: IImage): HTMLElement {
    const img = document.createElement("img");
    img.id = "";
    img.style.position = data.position;
    img.alt = data.alt;
    img.src = data.src;
    img.style.height = data.height;
    img.style.width = data.width;
    img.style.left = data.left;
    img.style.top = data.top;
    return img;
}