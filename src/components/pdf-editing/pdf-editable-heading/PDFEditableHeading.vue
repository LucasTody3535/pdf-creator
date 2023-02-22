<template>
    <div id="edit-heading-content">
            <div id="edit-content">
                <label for="">Conteúdo</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.innerText" type="text" placeholder="...">
            </div>
            <div id="edit-x-axis">
                <label for="">Posicionamento X</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.left" type="text" placeholder="...">
            </div>
            <div id="edit-y-axis">
                <label for="">Posicionamento Y</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.top" type="text" placeholder="...">
            </div>
            <div id="edit-font-size">
                <label for="">Tam. da Fonte</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.fontSize" type="text" placeholder="...">
            </div>
            <div id="edit-font-color">
                <label for="">Cor da Fonte</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.color" type="color" placeholder="...">
            </div>
        </div>
</template>

<script setup lang="ts">
    const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLElement
    }>();
</script>

<style scoped>
    #edit-heading-content {
        height: 240px;
        width: 500px;
        display: grid;
        grid-template-columns: repeat(3, 33.3%);
        row-gap: 5px;
        grid-auto-rows: 18%;
    }
</style>