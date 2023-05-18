<script setup>
import { useRoute } from 'vue-router'
import { ElScrollbar, ElCollapse, ElCollapseItem, ElCard } from 'element-plus'
import AInstance from '../service/axiosInstance.js'
import { onMounted, ref, reactive } from 'vue'

const assideKey = ref(0)
let activeNames = reactive([])
let { treeId } = useRoute().params
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
  AInstance.get(`/config/treeConfig.json`).then((res) => {
    examleList = []
    let titleList = []
    Object.keys(res.data).forEach((ele, index) => {
      examleList.push({
        title: ele,
        list: []
      })
      titleList.push(ele)
      Object.keys(res.data[ele]).forEach((subEle) => {
        var val = res.data[ele][subEle]
        examleList[index].list.push({
          imgUrl: `/thumbnail/tree/${val}.jpg`,
          cardName: subEle,
          valName: val
        })
        if (treeId == val) {
          RedirectHtml(val)
        }
      })
    })
    activeNames = titleList
    assideKey.value++
  })
})
function RedirectHtml(name) {
  const src = `/trees/${name}.html`
  const iframeView = document.getElementById('tree-container')
  if (null != iframeView) {
    iframeView.src = src
    iframeView.style.display = 'unset'
  }
}
</script>

<template>
  <el-container class="examples-container">
    <el-aside class="examples-asside">
      <el-scrollbar class="examples-collapse">
        <el-collapse :key="assideKey" class="asside-collapse" v-model="activeNames">
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

    <iframe id="tree-container" class="trees-iframe-container"></iframe>
  </el-container>
  <footer-mark />
</template>


<style scoped>
.examples-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.examples-asside {
  position: relative;
  width: 15%;
  height: 100%;
  border-right: 2px solid azure;
  font-size: 2vh;
}
.examples-collapse {
  position: relative;
  height: 100%;
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
.trees-iframe-container {
  position: relative;
  width: 85%;
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
