<template>
    <div style="width: 100vw;display: flex;flex-direction: column;align-items: center;margin-top: 100px;">
        <div style="display: flex;align-items: center;">
            <div style='display:flex;flex-direction: column;'>
                <h1 style="margin-left:10px;"  class="focus-in-expand">CSS特效資源01-animista</h1>
                <h1 class="animate__animated animate__rubberBand">CSS特效資源02-animate</h1>
            </div>
        </div>
    </div>
</template>
<script setup>
  import { useMainStore } from "@/store/currentStore";
  const mainStore = useMainStore();
  mainStore.routeName="echarts模組"
</script>

<style>
.focus-in-expand {
    -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
  /* ----------------------------------------------
   * Generated by Animista on 2024-5-14 11:27:37
   * Licensed under FreeBSD License.
   * See http://animista.net/license for more info. 
   * w: http://animista.net, t: @cssanimista
   * ---------------------------------------------- */
  
  /**
   * ----------------------------------------
   * animation focus-in-expand
   * ----------------------------------------
   */
   @-webkit-keyframes focus-in-expand {
    0% {
      letter-spacing: -0.5em;
      -webkit-filter: blur(12px);
              filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
              filter: blur(0px);
      opacity: 1;
    }
  }
  @keyframes focus-in-expand {
    0% {
      letter-spacing: -0.5em;
      -webkit-filter: blur(12px);
              filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
              filter: blur(0px);
      opacity: 1;
    }
  }
  
</style>