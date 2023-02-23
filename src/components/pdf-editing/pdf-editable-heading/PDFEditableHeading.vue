<template>
    <div id="edit-heading-content">
            <div id="edit-content">
                <label for="">Conteúdo</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.innerText" type="text" placeholder="...">
            </div>
            <XYAxisEditing :selected-page-item="selectedPageItem" />
            <div id="edit-font-size">
                <label for="">Tam. da Fonte</label>
                <br>
                <input class="input-style-for-editable-pdf-content" v-model="selectedPageItem!.style.fontSize" type="text" placeholder="...">
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
    import XYAxisEditing from '../sub-components/x-y-axis-editing/XYAxisEditing.vue';

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