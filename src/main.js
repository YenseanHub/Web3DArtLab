import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from '@/service/axiosInstance.js'
import './assets/main.css'
// markdown 相关文件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VMdPreview.use(vuepressTheme);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$axios=axios;
app.use(VMdPreview)

app.mount('#app')
