import Sortable from 'sortablejs';
export default defineNuxtPlugin(nuxtApp => {
    // 方法一
    nuxtApp.provide('Sortable', Sortable )
    //   // 方法二
    // return {  provide : Sortable }
})