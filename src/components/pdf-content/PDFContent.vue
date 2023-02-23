<template>
  <div id="pdf-wrapper">
    <div ref="htmlPageRepresentationList" class="pdf-page" v-for="(page, index) of pdf!.getPages()"
    :key="index" @click.self="changePage(page)">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, type Ref } from 'vue';
import { PDFPage } from '../../models/pdf/page/PDFPage';
import { IPDFObject, ISelectedPage, ISelectedPageItem } from '../../symbols/symbols';
import { useHTMLDropZone } from "../../composables/drag-n-drop/drag_n_drop";
import { createHeading, createImage, createParagraph } from '../../utils/dom/dom_utils';

const pdf = inject(IPDFObject);
const selectedPage = ref(inject(ISelectedPage)!);
const selectedPageItem = inject(ISelectedPageItem);
const htmlPageRepresentationList: Ref<Array<HTMLDivElement>> = ref([]);
let lastSelectedPDFPageItem: HTMLElement | null = null;

function selectItemToEdit(ev: Event) {
  if(lastSelectedPDFPageItem === (ev.currentTarget as HTMLElement)) {
    selectedPageItem!.value = null;
    lastSelectedPDFPageItem.classList.remove("selected-item");
    lastSelectedPDFPageItem = null;
    return;
  }
  lastSelectedPDFPageItem?.classList.remove("selected-item");
  (ev.currentTarget as HTMLElement).classList.add("selected-item");
  lastSelectedPDFPageItem = (ev.currentTarget as HTMLElement);
  selectedPageItem!.value = (ev.currentTarget as HTMLElement);
}

function changePage(pageToUpdate: PDFPage) {
  selectedPage.value?.getPageWrapperElements()?.forEach(content => {
    content.removeEventListener("click", selectItemToEdit);
  });
  pageToUpdate.getPageWrapperElements()?.forEach(content => {
    content.addEventListener("click", selectItemToEdit);
  });

  const oldSelectedPage = pdf!.value.getPages().indexOf(selectedPage!.value!);
  const newSelectedPage = pdf!.value.getPages().indexOf(pageToUpdate);
  if(oldSelectedPage === newSelectedPage) {
    htmlPageRepresentationList.value[oldSelectedPage]?.classList.remove("selected");
    selectedPage.value?.getPageWrapperElements()?.forEach(content => {
      content.removeEventListener("click", selectItemToEdit);
    });
    selectedPage!.value = null;
    selectedPageItem!.value = null;
    lastSelectedPDFPageItem?.classList.remove("selected-item");
    lastSelectedPDFPageItem = null;
    return;
  }
  htmlPageRepresentationList.value[oldSelectedPage]?.classList.remove("selected");
  htmlPageRepresentationList.value[newSelectedPage]?.classList.add("selected");
  selectedPage!.value = pageToUpdate;
}

function addHeading() {
  return createHeading({
    position: "absolute",
    fontSize: "30px",
    top: "5px",
    left: "5px",
    content: "Text sample"
  });
}

function addImage() {
  return createImage({
    position: "absolute",
    fontSize: "15px",
    top: "5px",
    left: "5px",
    src: "data:image/jpeg;base64,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",
    alt: "Image unavailable",
    height: "100mm",
    width: "100mm"
  }); 
}

function addParagraph() {
  return createParagraph({
    position: "absolute",
    fontSize: "10px",
    maxWidth: "210mm",
    top: "5px",
    left: "5px",
    content: "Text sample"
  });
}

watch(computed(() => htmlPageRepresentationList.value.length), () => {
  const pdfPages = pdf!.value.getPages();
  htmlPageRepresentationList.value.forEach((page, index) => {
    pdfPages[index].updatePageWrapper(page);
    useHTMLDropZone(page, {
      onDragEnter: (ev: DragEvent) => { ev.preventDefault() },
      onDragEnd: (ev: DragEvent) => { ev.preventDefault() },
      onDragOver: (ev: DragEvent) => {
        ev.preventDefault();
        ev.dataTransfer!.dropEffect = "copy";
      },
      onDrop: (ev: DragEvent) => {
        ev.preventDefault();
        const draggedElementId = ev.dataTransfer!.getData("text/plain");
        const page = (ev.currentTarget as HTMLElement);
        const draggedElement = document.getElementById(draggedElementId)!;
        const draggedElementType: string = draggedElement.dataset.pdf_composable!;
        let pdfElement: HTMLElement;
        draggedElement.id = "";

        if(draggedElementType === "HEADING") pdfElement = addHeading();
        else if(draggedElementType === "IMAGE") pdfElement = addImage();
        else if(draggedElementType === "PARAGRAPH") pdfElement = addParagraph();
        else return;

        page.appendChild(pdfElement!);
      }
    });
  });
});

watch(computed(() => pdf!.value.getPages().length), () => {
  htmlPageRepresentationList.value.forEach((page, index) => {
    pdf!.value.getPages()[index]?.updatePageWrapper(page);
  });
});
</script>

<style scoped>
#pdf-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: scroll !important;
  scrollbar-width: none;
}

#pdf-wrapper::-webkit-scrollbar {
  display: none;
}

.pdf-page {
  height: 297mm;
  width: 210mm;
  display: block;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgb(95, 95, 95);
  margin: 10px auto;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  background-color: white;
}

.pdf-page.selected {
  border: 1px solid black;
  box-shadow: none;
}
</style>

<style>
.selected-item {
  border: 1px solid black !important;
  border-radius: 5px;
}
</style>
