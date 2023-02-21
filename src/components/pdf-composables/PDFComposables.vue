<template>
    <div id="pdf-composable-wrapper">
        <div v-for="(composable, index) of composables"
            :data-pdf_composable="composable.id" :key="index"
            :ref="setElement"
            class="dragable flex-centered">
            {{ composable.helpText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
import { useHTMLDragable } from '../../composables/drag-n-drop/drag_n_drop';

interface IComposable {
    id: string,
    helpText: string
}

function createComposable(id: string, helpText: string): IComposable {
    return {
        id: id,
        helpText: helpText
    };
}

const composables: Array<IComposable> = [
    createComposable("HEADING", "Título"),
    createComposable("IMAGE", "Imagem"),
    createComposable("PARAGRAPH", "Parágrafo"),
    //createComposable("BACKGROUND_IMG", "Fundo"),
    //createComposable("GEOMETRY_FORM", "Forma Geomé."),
    //createComposable("LINE", "Divisória"),
    //createComposable("TABLE", "Tabela"),
    //createComposable("CHECKBOX", "Checkbox")
];
const elements: Ref<Array<HTMLElement>> = ref([]);
function setElement(el: any) {
    elements.value.push(el);
}

onMounted(() => {
    elements.value.forEach(element => {
        useHTMLDragable(element, "currentDraggedElement", "copy");
    });
});
</script>

<style scoped>
#pdf-composable-wrapper {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50% 50%;
    row-gap: 5px;
    column-gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    padding: 10px;
}

#pdf-composable-wrapper .dragable {
    box-shadow: 1px 1px 1px 1px black;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: move;
    background-color: white;
}
</style>