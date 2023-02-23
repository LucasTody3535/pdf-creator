<template>
    <div id="edit-image-content">
        <div id="edit-content">
            <label style="margin-bottom: 200px;">Conteúdo</label>
            <br>
            <button @click="selectImage" class="input-style-for-editable-pdf-content">
                Selecionar Imagem
            </button>
            <input id="image-src" @input="updateImage" hidden accept=".jpg, .png, .jpeg" type="file" placeholder="...">
        </div>
        <XYAxisEditing :selected-page-item="selectedPageItem" />
        <HeightWidthEditing :selected-page-item="selectedPageItem" />
    </div>
</template>

<script setup lang="ts">
import HeightWidthEditing from '../sub-components/height-width-editing/HeightWidthEditing.vue';
import XYAxisEditing from '../sub-components/x-y-axis-editing/XYAxisEditing.vue';

   const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLImageElement
    }>();

    function selectImage() {
        document.getElementById("image-src")?.click();
    }

    function updateImage() {
        let file = (document.getElementById("image-src") as HTMLInputElement).files![0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
            selectedPageItem.src = fileReader.result!.toString();
        };
        fileReader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
</script>

<style scoped>
#edit-image-content {
    height: 240px;
    width: 500px;
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
    row-gap: 5px;
    grid-auto-rows: 18%;
}
</style>