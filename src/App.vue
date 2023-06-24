<template>
  <div id="app">
    <NavbarPage v-if="shouldShowNavbar" />
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavbarPage from './components/NavbarPage.vue'

export default {
  components: {
    NavbarPage
  },
  setup() {
    const route = useRoute();

    const shouldShowNavbar = computed(() => {
      const pathsWithoutNavbar = ['/login', '/register'];
      return !pathsWithoutNavbar.includes(route.path);
    });

    return { shouldShowNavbar };
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
