<script setup lang="ts">
import { computed, provide, ref } from "vue";
import PDFContent from "./components/pdf-content/PDFContent.vue";
import PDFControls from "./components/pdf-controls/PDFControls.vue";
import { PDFBody } from "./models/pdf/body/PDFBody";
import { IPDFObject, ISelectedPage, ISelectedPageItem } from "./symbols/symbols";

const pdf = ref(new PDFBody());
const selectedPdfPage = ref(null);
const selectedPdfPageItem = ref(null);

provide(IPDFObject, pdf);
provide(ISelectedPage, selectedPdfPage);
provide(ISelectedPageItem, selectedPdfPageItem);
</script>

<template>
  <PDFContent />
  <PDFControls data-html2canvas-ignore="true" />
</template>

<style>
#app {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100%;
  background-color: rgb(231, 231, 231);
}

.flex-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center-left {
  display: flex;
  align-items: center;
  justify-content: left;
}

.input-style-for-editable-pdf-content {
  border: 1px solid rgb(199, 199, 199);
  padding: 2px;
  border-radius: 5px;
  background-color: rgb(241, 241, 241);
}
</style>
