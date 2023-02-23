<template>
    <div id="edit-font-size">
        <label for="">Tam. da Fonte(px)</label>
        <br>
        <input class="input-style-for-editable-pdf-content"
        :value="getFontSize" type="number"
        @input="changeFontSize"
        >
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLElement
    }>();

    const getFontSize = computed(() => {
        const fSize = getComputedStyle(selectedPageItem!).getPropertyValue("font-size")
        return parseInt(fSize).toFixed(0);
    });

    function changeFontSize(ev: Event) {
        const input = (ev.currentTarget as HTMLInputElement);
        selectedPageItem.style.fontSize = `${input.value}px`;
    }
</script>

<style scoped>

</style>