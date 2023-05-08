<script setup>
import { useRouter } from 'vue-router'
import { ElScrollbar, ElCollapse, ElCollapseItem, ElCard } from 'element-plus'
import AInstance from '../service/axiosInstance.js'
import { onMounted, ref } from 'vue'

const router = useRouter()
const assideKey = ref(0)

// const src = new URL('/public/thumbnail/basic.jpg', import.meta.url).href
let examleList = [
  {
    title: '...',
    list: [
      {
        imgUrl: '',
        cardName: ''
      }
    ]
  }
]
onMounted(() => {
  AInstance.get(`/config/examples.json`).then((res) => {
    examleList = []
    Object.keys(res.data).forEach((ele, index) => {
      examleList.push({
        title: ele,
        list: []
      })
      Object.keys(res.data[ele]).forEach((subEle) => {
        examleList[index].list.push({
          imgUrl: new URL(`/public/thumbnail/${res.data[ele][subEle]}.jpg`, import.meta.url).href,
          cardName: subEle,
          valName: res.data[ele][subEle]
        })
      })
    })
    assideKey.value++
  })
})
function RedirectHtml(name) {
  const src = new URL(`/public/examples/${name}.html`, import.meta.url).href
  const iframeView = document.getElementById('example-container')
  if (null != iframeView) {
    iframeView.src = src
  }
}
</script>

<template>
  <el-container class="examples-container">
    <el-aside class="examples-asside">
      <el-scrollbar>
        <el-collapse :key="assideKey" class="asside-collapse">
          <el-collapse-item
            v-for="(item, key) in examleList"
            :title="item.title"
            :key="key"
            :name="item.title"
          >
            <el-card
              v-for="(subItem, key) in item.list"
              :key="key"
              :body-style="{ padding: '0px' }"
              @click="RedirectHtml(subItem.valName)"
            >
              <img :src="subItem.imgUrl" class="card-image" />
              <div style="padding: 2px 10px; font-size: 1.5vh">
                <span>{{ subItem.cardName }}</span>
              </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </el-aside>

    <iframe id="example-container" class="examples-iframe-container"></iframe>
  </el-container>
  <footer-mark />
</template>


<style scoped>
.examples-container {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 15% 85%;
}
.examples-asside {
  width: 100%;
  height: 100%;
  border-right: 2px solid azure;
  font-size: 2vh;
}
:deep(.el-collapse) {
  --el-collapse-header-font-size: 1.8vh;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-header-text-color: white;
}
:deep(.el-collapse-item__header) {
  padding-left: 5px;
}
:deep(.el-collapse-item__wrap) {
  background-color: transparent;
}
.examples-iframe-container {
  width: 100%;
  height: 100%;
  border: 0px;
}
.card-image {
  width: 100%;
}
:deep(.el-collapse-item__content) {
  padding: 10px;
}
.el-card {
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
