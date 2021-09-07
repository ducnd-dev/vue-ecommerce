<template>
  <div class="shop">
  </div>
</template>

<script lang="ts">
import getRepository from "@/services";
import { Component, Vue } from "vue-property-decorator";
const apiProduct = getRepository("product");
@Component
export default class Shop extends Vue {
  created(): void {
    apiProduct?.getProduct({});
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: block;
}
</style>
