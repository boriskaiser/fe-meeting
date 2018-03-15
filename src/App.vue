<template>
  <div id="app">
    <button @click="addNewImages">+ 10 images</button>
    <img 
      v-for="url in imageUrls"
      :key="url" 
      v-lazy-src="url"
    >
  </div>
</template>

<script>
import * as directives from "./directives";

const generateImageUrls = (start = 0, length = 10) => {
  return Array.from(
    new Array(length),
    (x, i) => `https://picsum.photos/400/400?image=${i + start}`
  );
};

export default {
  name: "App",
  directives,
  data: () => ({
    imageUrls: generateImageUrls()
  }),
  methods: {
    addNewImages() {
      this.imageUrls.push(...generateImageUrls(this.imageUrls.length));
    }
  }
};
</script>

<style lang="scss">
$margin: 30px;

button {
  position: fixed;
  top: $margin;
  right: $margin;
}

img {
  display: block;
  min-height: 400px;
  margin: $margin auto;
}
</style>
