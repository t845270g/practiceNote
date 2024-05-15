// components/CustomLoadingIndicator.vue
<template>
    <div v-if="isLoading" class="bg">
      <div class="loader"></div>
    </div>
</template>

<script setup>
  const nuxtApp = useNuxtApp();
  const isLoading = ref(false);

  nuxtApp.hook('page:start', () => {
    isLoading.value = true;
  });

  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      isLoading.value = false;
    }, 200);
  });
</script>

<style lang="scss" scoped>
.bg{
  position: fixed;
  background-color: #8080808a;
  width: 100vw;
  height:100vh;
  left:0px;
  top:0px;
  z-index:1000;
}

.loader {
  position:sticky;
  top: 50vh;
  left: 50vw;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side,#ED303C 94%,#0000),
    radial-gradient(farthest-side,#3B8183 94%,#0000),
    radial-gradient(farthest-side,#FAD089 94%,#0000),
    radial-gradient(farthest-side,#FF9C5B 94%,#0000),
    #ED303C;
  background-size: 105% 105%;
  background-repeat: no-repeat;
  animation: l5 2s infinite; 
}
@keyframes l5 {
  0%  {background-position: 50% -50px,-40px 50%, 50% calc(100% + 50px),calc(100% + 50px) 50%}
  20%,
  25% {background-position: 50% -50px,-50px 50%, 50% calc(100% + 50px),50% 50%}
  45%,
  50% {background-position: 50% -50px,-50px 50%, 50% 50%              ,50% 50%}
  75%,
  75% {background-position: 50% -50px, 50%  50%, 50% 50%              ,50% 50%}
  95%,
  100%{background-position: 50%  50% , 50%  50%, 50% 50%              ,50% 50%}
}
</style>