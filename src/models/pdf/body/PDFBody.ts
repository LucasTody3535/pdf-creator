import { PDFPage } from "../page/PDFPage";

export class PDFBody {
    private pages: Array<PDFPage>;

    constructor() {
        this.pages = [];
    }

    addPage() {
        this.pages.push(new PDFPage());
    }

    removeLastPage() {
        this.pages.pop();
    }

    getPages() {
        return this.pages;
    }
}
