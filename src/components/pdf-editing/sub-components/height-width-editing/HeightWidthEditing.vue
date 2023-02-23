<template>
    <div id="edit-height">
        <label for="">Altura(mm)</label>
        <br>
        <input class="input-style-for-editable-pdf-content"
        :value="fromPixelToMM(selectedPageItem!.offsetHeight).toFixed(0)"
        ref="height_input"
        type="text" placeholder="..."
        @input="changeHeight">
    </div>
    <div id="edit-width">
        <label for="">Comprimento(mm)</label>
        <br>
        <input class="input-style-for-editable-pdf-content"
        :value="fromPixelToMM(selectedPageItem!.offsetWidth).toFixed(0)"
        ref="width_input"
        type="text" placeholder="..."
        @input="changeWidth">
    </div>
</template>

<script setup lang="ts">
    import { type Ref, ref, onMounted } from "vue";
    import { useRestrictToOnlyNumbersForKeypressings } from "../../../../composables/numeric_value/numeric_value";
    import { fromPixelToMM } from "../../../../utils/conversion/conversion_utils"

    let height_input: Ref<HTMLInputElement | null> = ref(null);
    let width_input: Ref<HTMLInputElement | null> = ref(null);

    const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLImageElement
    }>();

    function changeHeight(ev: Event) {
        const input = (ev.currentTarget as HTMLInputElement);
        selectedPageItem.style.height = `${input.value}mm`;
    }
    
    function changeWidth(ev: Event) {
        const input = (ev.currentTarget as HTMLInputElement);
        selectedPageItem.style.width = `${input.value}mm`;
    }

    onMounted(() => {
        useRestrictToOnlyNumbersForKeypressings(height_input.value!);
        useRestrictToOnlyNumbersForKeypressings(width_input.value!);
    });
</script>

<style scoped>

</style>