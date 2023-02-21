<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { PDFBody } from "./models/pdf/body/PDFBody";
import { IPDFObject, ISelectedPage } from "./symbols/symbols";

const pdf = ref(new PDFBody());
const selectedPdfPage = ref(null);

provide(IPDFObject, pdf);
provide(ISelectedPage, selectedPdfPage);
</script>

<template>
  <h1>Works</h1>
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
</style>
