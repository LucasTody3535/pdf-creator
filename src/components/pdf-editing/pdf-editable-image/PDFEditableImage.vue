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
        <div id="edit-height">
            <label for="">Altura</label>
            <br>
            <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.height" type="text" placeholder="...">
        </div>
        <div id="edit-width">
            <label for="">Comprimento</label>
            <br>
            <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.width" type="text" placeholder="...">
        </div>
    </div>
</template>

<script setup lang="ts">
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