<template>
    <div id="edit-paragraph-content">
        <div id="edit-content">
            <label for="">Conteúdo</label>
            <br>
            <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.innerText" type="text" placeholder="...">
        </div>
        <XYAxisEditing :selected-page-item="selectedPageItem" />
        <FontSizeEditing :selected-page-item="selectedPageItem" />
        <HeightWidthEditing :selected-page-item="selectedPageItem" />
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
    import FontSizeEditing from '../sub-components/font-size-editing/FontSizeEditing.vue';
    import HeightWidthEditing from '../sub-components/height-width-editing/HeightWidthEditing.vue';
    import XYAxisEditing from '../sub-components/x-y-axis-editing/XYAxisEditing.vue';

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