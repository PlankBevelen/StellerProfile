import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIcons from '@element-plus/icons-vue'

import '@/assets/global.css'

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
    locale: zhCn,
})

for (const [key, value] of Object.entries(ElementPlusIcons)) {
    app.component(key, value)
}

app.mount('#app')
