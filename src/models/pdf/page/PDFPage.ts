export class PDFPage {
    private pageWrapper: ChildNode | null = null;

    constructor() {}

    updatePageWrapper(page: HTMLElement) {
        this.pageWrapper = page;
    }

    getPageWrapperElements() {
        return this.pageWrapper?.childNodes;
    }
}
