<template>
    <div style="display: flex;flex-direction: column;margin: 10px;">
        <div style="display: flex;align-items: center;">
            <NuxtLink to="/" v-if="show">
                <el-button  type="primary" :icon="ArrowLeft" />   
            </NuxtLink>
            <div style='display:flex;flex-direction: column;'>
                <h1 style="margin-left:10px;">{{routeName}}</h1>
            </div>
        </div>
        <slot />
    </div>
</template>
<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { useMainStore } from "@/store/currentStore";
const show=ref(false)
const mainStore = useMainStore();
const routeName=computed(()=>{
    if(mainStore.routeName=='This is HomePage.'){
        show.value=false
    }else{
        show.value=true
    }
    return mainStore.routeName
})

</script>

<style>
 
</style>