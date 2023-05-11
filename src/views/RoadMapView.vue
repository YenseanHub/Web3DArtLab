<script setup>
import drawRoadmap from '../core/RoadMap/drawRoadmap.js'
import * as roadMap from '../core/RoadMap/roadmap.js'
import domtoimage from 'dom-to-image'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElSwitch, ElSelect, ElOption } from 'element-plus'
import FooterMark from '../components/FooterMark.vue'

const options = [
  { value: 'all', label: '完整路线', canvasHeight: 5000 },
  { value: 'p1', label: '👶🏻 阶段1', canvasHeight: 2000 },
  { value: 'p2', label: '👦🏻 阶段2', canvasHeight: 3000 },
  { value: 'p3', label: '👨🏻 阶段3', canvasHeight: 2000 }
  //   { value: "p10000", label: "👴🏻 养生路线" },  // 这个也挺重要的，哈哈！(手动狗头
]
const showTag = ref(true)
const process = reactive(options[0])
const selValue = ref(0)
const router = useRouter()

function canvasMouseDownHandler(options) {
  if (options.target && options.target.link) {
    // 是否有跳转到markdown，从markdown返回的时候需要绘制一次
    window.__GO_TO_MARKDOWN__ = true
    console.log(router)
    router.push(`/markdown${options.target.link}`)
  }
}
let canvas
onMounted(() => {
  canvas = drawRoadmap(
    `roadmapCanvas`,
    roadMap[process.value],
    showTag.value,
    process.canvasHeight,
    1100
  )
  canvas.on('mouse:down', canvasMouseDownHandler)
})
onUnmounted(() => {
  canvas.off('mouse:down', canvasMouseDownHandler)
})
function onShowTag(value) {
  showTag.value = value
}
function onProcess() {
  const _val = options[selValue.value]
  console.log(_val)
  drawRoadmap(`roadmapCanvas`, roadMap[_val.value], showTag.value, _val.canvasHeight, 1100)
}

function onDownloadImg() {
  const $el = document.querySelector('.roadmap')
  const downloadName = process.label
    .replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
    .trim()
  domtoimage.toJpeg($el).then(function (dataUrl) {
    const link = document.createElement('a')
    link.download = `roadmap-${downloadName}.jpeg`
    link.href = dataUrl
    link.click()
  })
}
</script>

<template>
  <div class="roadmap-container">
    <div class="process-select-container">
      <div class="tag-switch">
        <span>展示标签</span>
        <el-switch
          active-text="开"
          inactive-text="关"
          v-model="showTag"
          defaultChecked
          @change="onShowTag"
        />
      </div>
      <el-select v-model="selValue" class="process-select" placeholder="请选择" @change="onProcess">
        <el-option
          v-for="(item, index) in options"
          :key="item.value"
          :label="item.label"
          :value="index"
        />
      </el-select>
      <el-button color="#222222" class="download" @click="onDownloadImg">下载路线图</el-button>
    </div>

    <div class="roadmap">
      <div v-if="showTag" class="desc-container">
        <div class="explain-square">
          <div class="explain-content">
            <div>1. <span role="img" aria-label="recommend"> ⭐️ </span> - 推荐使用</div>
            <div>2. <span role="img" aria-label="prepare"> ✅ </span> - 备选方案</div>
            <div>
              3. <span role="img" aria-label="no recommend"> ❎ </span> -
              不推荐学习（技术已过时或其他原因）
            </div>
            <div>
              4.
              <span class="grey-card">xxxx</span> - 需要时再学
            </div>
          </div>
        </div>
      </div>
      <div id="canvas-container">
        <canvas id="roadmapCanvas"></canvas>
      </div>
    </div>
    <footer-mark />
  </div>
  <a class="roadmap-ref" href="https://github.com/objtube/front-end-roadmap" target="_blank" rel="noopener">Reference front-end-roadmap</a>
  
</template>


<style scoped>
.roadmap-container {
  font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
  position: relative;
  padding-top: 60px;
  width: 100%;
}
#canvas-container {
  width: 100%;
}
.desc-container {
  display: flex;
  position: relative;
}
.roadmap {
  /* background-color: #2d4059; */
  padding-top: 40px;
  width: 80%;
  position: relative;
  left: 20%;
}
.roadmap-ref {
  position:absolute;
  top: 0px;
  bottom: 0px;
  height: 4.5vh;
  font-size: 2.5vh;
}
.desc-container .explain-square {
  flex: 1;
  text-align: left;
}
.desc-container .explain-square .explain-content {
  border-radius: 2px;
  /* border: 1px solid #eee; */
  font-size: 13px;
  width: 220px;
  padding: 10px;
  background-color: #fffecf;
  color: #666;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 4px 10px;
  position: relative;
  transform: rotate(-4deg);
}
.explain-content div {
  margin-bottom: 4px;
}
.explain-content .grey-card {
  display: inline-block;
  height: 20px;
  border-radius: 2px;
  padding: 2px 10px;
  background-color: #cccccc;
}
.process-select-container {
  display: flex;
  justify-content: flex-end;
  padding-right: 10%;
}
.process-select-container .tag-switch {
  color: #fff;
  padding-right: 10px;
  margin-right: 10px;
  height: 38px;
  line-height: 38px;
  border-right: 2px solid #aaa;
}
.process-select-container .tag-switch span {
  margin-right: 10px;
}
.process-select-container .process-select {
  width: 200px;
}
.process-select-container .download {
  color: #fff;
  padding: 0 10px;
  vertical-align: bottom;
  margin-left: 10px;
  height: 38px;
  line-height: 38px;
  border: 1px dashed #eee;
  border-radius: 2px;
  cursor: pointer;
}
.process-select-container .download:hover {
  background-color: #333;
}

.roadmap {
  text-align: center;
}
.roadmap-canvas {
  margin: 0 auto;
}
.rc-switch-checked {
  background-color: #2d4059;
  border-color: #fff;
}
</style>
