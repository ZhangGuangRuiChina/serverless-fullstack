<template>
  <div id="app">
      <itemPage />
  </div>
</template>

<script>
import itemPage from "./components/itemPage";

export default {
  name: "app",
  components: {
    itemPage
  },
  data() {
    return {
      
    };
  },
  methods: {}
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
