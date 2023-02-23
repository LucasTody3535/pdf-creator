<template>
    <div id="edit-paragraph-content">
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
        <div id="edit-box-width">
            <label for="">Com. Container</label>
            <br>
            <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.width" type="text" placeholder="...">
        </div>
        <div id="edit-box-height">
            <label for="">Alt. Container</label>
            <br>
            <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.height" type="text" placeholder="...">
        </div>
        <div id="edit-font-color">
            <label for="">Cor da Fonte</label>
            <br>
            <select v-model="selectedPageItem!.style.color" id="" class="input-style-for-editable-pdf-content">
                <option value="#000000">Preto</option>
                <option value="#ffffff">Branco</option>
                <option value="#f31e0f">Vermelho</option>
                <option value="#50ec31">Verde</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLElement
    }>();
</script>

<style scoped>
    #edit-paragraph-content {
        height: 240px;
        width: 500px;
        display: grid;
        grid-template-columns: repeat(3, 33.3%);
        row-gap: 5px;
        grid-auto-rows: 18%;
    }
</style>