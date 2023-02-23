<template>
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
</template>

<script setup lang="ts">
    const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLElement
    }>();
</script>

<style scoped>

</style>