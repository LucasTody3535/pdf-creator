<template>
    <div id="edit-x-axis">
        <label for="">Eixo X(mm)</label>
        <br>
        <input class="input-style-for-editable-pdf-content"
        ref="x_axis_input"
        :value="selectedPageItem.offsetLeft" min="0" minlength="0"
        @input="changeXAxis" type="number"
        @blur="resetToDefaultValueIfIsEmpty">
    </div>
    <div id="edit-y-axis">
        <label for="">Eixo Y(mm)</label>
        <br>
        <input class="input-style-for-editable-pdf-content"
        ref="y_axis_input"
        :value="selectedPageItem.offsetTop"
        @input="changeYAxis" type="number"
        @blur="resetToDefaultValueIfIsEmpty">
    </div>
</template>

<script setup lang="ts">
   import { onMounted, type Ref, ref } from "vue";
   import { useRestrictToOnlyNumbersForKeypressings } from "../../../../composables/numeric_value/numeric_value";

   let x_axis_input: Ref<HTMLInputElement | null> = ref(null);
   let y_axis_input: Ref<HTMLInputElement | null> = ref(null);

   const { selectedPageItem } = defineProps<{
        selectedPageItem: HTMLElement
   }>();

   function changeXAxis(ev: Event) {
    const input = (ev.currentTarget as HTMLInputElement);
    selectedPageItem.style.left = `${input.value}mm`;
   }

   function changeYAxis(ev: Event) {
    const input = (ev.currentTarget as HTMLInputElement);
    selectedPageItem.style.top = `${input.value}mm`;
   }

   function resetToDefaultValueIfIsEmpty(ev: Event) {
    const target = (ev.currentTarget as HTMLInputElement);
    if(target.value.length > 0) return;
    target.value = "0";
   }

   onMounted(() => {
    useRestrictToOnlyNumbersForKeypressings(x_axis_input.value!);
    useRestrictToOnlyNumbersForKeypressings(y_axis_input.value!);
   });
</script>

<style scoped>

</style>