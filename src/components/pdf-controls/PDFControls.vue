<template>
    <div id="pdf-controls">
        <PDFComposables class="pdf-composables" />
        <div class="floating-btns">
            <div @click="addPage" class="icon-wrapper flex-centered" title="Adicionar nova página">
                <PlusIcon size="24" color="black" />
            </div>
            <div @click="removeLastPage" class="icon-wrapper flex-centered" title="Remover última página">
                <MinusIcon size="24" color="black" />
            </div>
            <div @click="genPDF" class="icon-wrapper flex-centered" title="Gerar pdf">
                <FileExportIcon size="24" color="black" />
            </div>
            <div @click="deletePageSelectedItem"
            :style="getStyleBasedOnCurrentSelectedItemToEdit"
            class="icon-wrapper flex-centered"
            title="Deletar item da página selecionada">
                <TrashIcon size="24" color="black" />
            </div>
        </div>
        <div id="selected-page-items-edit">
            <PDFEditableHeading v-if="editHeading" :selected-page-item="selectedPageItem!" />
            <PDFEditableImage v-if="editImage" :selected-page-item="selectedPageItem! as HTMLImageElement" />
            <PDFEditableParagraph v-if="editParagraph" :selected-page-item="selectedPageItem!" />
            <p v-if="!editHeading && !editImage && !editParagraph" id="message" class="flex-centered">
                Nenhum item selecionado para edição
            </p>
        </div>
        <div id="page-info">
            <div class="flex-center-left" id="page-info-selected-page">
                Página Selecionada: {{ getPageNumber || "N/A" }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref, ref, watch } from 'vue';
import { IPDFObject, ISelectedPage, ISelectedPageItem } from '../../symbols/symbols';
import { PlusIcon, MinusIcon, FileExportIcon, TrashIcon } from "vue-tabler-icons";
import PDFComposables from "../pdf-composables/PDFComposables.vue";
import { Template, BLANK_PDF, generate } from '@pdfme/generator';
import PDFEditableHeading from '../pdf-editing/pdf-editable-heading/PDFEditableHeading.vue';
import PDFEditableImage from "../pdf-editing/pdf-editable-image/PDFEditableImage.vue";
import { defineTextSchema, defineImageSchema } from '../../utils/pdfme/pdfme_utils';
import PDFEditableParagraph from '../pdf-editing/pdf-editable-paragraph/PDFEditableParagraph.vue';

const pdf = inject(IPDFObject);
const selectedPage = inject(ISelectedPage);
const selectedPageItem = inject(ISelectedPageItem);
const getPageNumber = computed(() => (pdf!.value.getPages().indexOf(selectedPage!.value!) + 1));

const getStyleBasedOnCurrentSelectedItemToEdit = computed(() => {
    return selectedPageItem!.value ?
        "background-color: white" :
        "background-color: #b6b6b6"
});

function addPage() {
    pdf?.value.addPage();
}

function removeLastPage() {
    pdf?.value.removeLastPage();
}

const editHeading = ref(false);
const editImage = ref(false);
const editParagraph = ref(false);

function isHeading() {
    return selectedPageItem!.value instanceof HTMLHeadingElement
}

function isImage() {
    return selectedPageItem!.value instanceof HTMLImageElement;
}

function isParagraph() {
    return selectedPageItem!.value instanceof HTMLParagraphElement;
}

function genPDF() {
    const pages: NodeListOf<HTMLElement> = document.querySelectorAll(".pdf-page");
    if(pages.length === 0) return;
    let actualSchema: any = {};
    let actualInput: any = {};
    let inputs: Array<any> = [];
    let template: Template = {
        basePdf: BLANK_PDF,
        schemas: []
    };
    actualSchema = {};
    pages.forEach((page, page_index) => {
        actualInput = {};
        page.childNodes.forEach((content, content_index) => {
            if(content instanceof HTMLHeadingElement) defineTextSchema(actualSchema, actualInput, content, `heading_${content_index}${page_index}`);
            else if(content instanceof HTMLImageElement) defineImageSchema(actualSchema, actualInput, content, `image_${content_index}${page_index}`);
            else if(content instanceof HTMLParagraphElement) defineTextSchema(actualSchema, actualInput, content, `paragraph_${content_index}${page_index}`);
        });
        inputs.push(actualInput);
    });
    template.schemas.push(actualSchema);
    generate({ template, inputs }).then(pdf => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
    });
}

function deletePageSelectedItem() {
    const parent = selectedPageItem?.value?.parentElement;
    if(parent) {
        parent.removeChild(selectedPageItem.value!);
        selectedPageItem.value = null;
    }
}

watch(computed(() => selectedPageItem?.value), () => {
    editHeading.value = isHeading();
    editImage.value = isImage();
    editParagraph.value = isParagraph();
});
</script>

<style scoped>
#pdf-controls {
    height: 100%;
    width: 100%;
    padding: 15px;
    display: flex;
    position: relative;
    flex-direction: column;
}

.icon-wrapper {
    background-color: white;
    border-radius: 25px;
    height: 30px;
    width: 30px;
    cursor: pointer;
    box-shadow: 1px 1px 4px 1px rgb(54, 54, 54);
}

#page-info {
    position: absolute;
    bottom: 10px;
    height: 50px;
    width: 90%;
    left: 0;
    display: block;
}

#page-info #page-info-selected-page {
    height: 100%;
    width: 300px;
}

.pdf-composables {
    height: 220px !important;
    /* background-color: purple; */
}

.floating-btns{
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    grid-template-rows: 100%;
    height: auto;
    padding: 10px;
}

#selected-page-items-edit {
    height: 250px;
    padding: 5px;
    box-shadow: 1px 1px 4px 1px rgb(54, 54, 54);
    background-color: white;
    border-radius: 5px;
}

#message {
    height: 100%;
    font-size: 20px;
}
</style>