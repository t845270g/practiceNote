<template>
   <div style="display: flex;flex-direction: column;align-items: center;">
      <el-button type="primary"  style="width:100px;">   
         <NuxtLink to="https://fishballyu.notion.site/Nuxt-3-5874b8895c774c1f92d8aa7e6e16dbbe" target="_blank">
            nuxt筆記
         </NuxtLink>

      </el-button>
      <div style="display: flex;margin-top:10px;">
         <el-button type="success">   
            <NuxtLink to="/fortawesome">fortawesome模組</NuxtLink>
         </el-button>
         <el-button type="success">   
            <NuxtLink to="/scss">scss模組</NuxtLink>
         </el-button>
         <el-button type="success">   
            <NuxtLink to="/echarts">echarts模組</NuxtLink>
         </el-button>
         <el-button type="success">   
            <NuxtLink to="/cssAnimate">動畫效果</NuxtLink>
         </el-button>
         <el-button type="success">   
            <NuxtLink to="/draggable">draggable模組</NuxtLink>
         </el-button>
         <el-button type="success">   
            <NuxtLink to="/matter">matter模組</NuxtLink>
         </el-button>
         <el-button type="success">   
            <NuxtLink to="/steps">el-steps</NuxtLink>
         </el-button>
      </div>

   </div>
</template>

<script setup>
import { useMainStore } from "@/store/currentStore";
const mainStore = useMainStore();
onMounted(()=>{
    mainStore.routeName="This is HomePage."
})
</script>     

<style>

</style>
