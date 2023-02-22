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
        </div>
        <div id="selected-page-items-edit">
            <PDFEditableHeading v-if="editHeading" :selected-page-item="selectedPageItem!" />
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
import { PlusIcon, MinusIcon, FileExportIcon } from "vue-tabler-icons";
import PDFComposables from "../pdf-composables/PDFComposables.vue";
import { Template, BLANK_PDF, generate } from '@pdfme/generator';
import { defineHeadingSchema, defineImageSchema } from "../../utils/pdfme/pdfme_utils";
import { ALPHABET } from "../../static/alphabet/static_alphabet";
import PDFEditableHeading from '../pdf-editing/pdf-editable-heading/PDFEditableHeading.vue';

const pdf = inject(IPDFObject);
const selectedPage = inject(ISelectedPage);
const selectedPageItem = inject(ISelectedPageItem);
const getPageNumber = computed(() => (pdf!.value.getPages().indexOf(selectedPage!.value!) + 1));

function addPage() {
    pdf?.value.addPage();
    if(selectedPage?.value === null) selectedPage.value = pdf!.value.getPages()[0];
}

function removeLastPage() {
    pdf?.value.removeLastPage();
}

const editHeading = ref(false);

function isHeading() {
    return selectedPageItem!.value instanceof HTMLHeadingElement
}

function genPDF() {
    const pages: NodeListOf<HTMLElement> = document.querySelectorAll(".pdf-page");
    if(pages.length === 0) return;
    let actualSchema: any;
    let actualInput: any;
    let template: Template = {
        basePdf: BLANK_PDF,
        schemas: []
    };
    let inputs: Array<any> = [];
    pages.forEach(page => {
        actualSchema = {};
        actualInput = {};
        page.childNodes.forEach((content, index) => {
            if(content instanceof HTMLHeadingElement) defineHeadingSchema(actualSchema, actualInput, content, ALPHABET.at(index)!);
            else if(content instanceof HTMLImageElement) defineImageSchema(actualSchema, actualInput, content, ALPHABET.at(index)!);
        });
        template.schemas.push(actualSchema);
        inputs.push(actualInput);
    });

    generate({ template, inputs }).then(pdf => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
    });
}

watch(computed(() => selectedPageItem?.value), () => {
    editHeading.value = isHeading();
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
</style>