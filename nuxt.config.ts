// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  modules: [
    "@element-plus/nuxt",
    '@pinia/nuxt'
  ],
    //全域套用的樣式匯入(放的是一般的樣式設定)
  css: ['~/assets/scss/main.scss', //設定整份專案套用的主要SCSS樣式
        '@fortawesome/fontawesome-svg-core/styles.css',
        'animate.css/animate.min.css',
        'bootstrap/dist/css/bootstrap.css',
  ],
  build: {
    transpile: [
        '@fortawesome/vue-fontawesome',
    ]
  },
  //全域套用的變數匯入(放的是scss中設定的變數資料($變數)，將這些變數資料($變數)直接使用在nuxt專案中的所有個別頁面的樣式中 )
  vite: {
  css: {//對CSS設置
    preprocessorOptions: {//設置域處理器
      scss: {//處理的是SCSS
        additionalData: '@use "assets/scss/_color.scss" as *;'//將assets/scss/_color.scss的內容導入全局(*)便量使用(@use)
      }
    }
  }
  },
})
