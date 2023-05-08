<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AInstance from '../../service/axiosInstance.js'
import { ElButton } from 'element-plus'
import FooterMark from '../../components/FooterMark.vue'

let markdownContent
const index = ref(0)
const router = useRouter()

onMounted(() => {
  let { query } = useRoute().params
  AInstance.get(`/md/${query}.md`).then((res) => {
    // console.log(res, '返回的数据')
    // console.log(res.data)
    markdownContent = ref(res.data)
    index.value++
  })
})
function goHome() {
  router.go(-1)
}
</script>

<template>
  <div className="markdown-container">
    <div className="go-home">
      <el-button type="primary" size="large" round @click="goHome"> 返回 </el-button>
    </div>
    <v-md-preview class="md-preview" :key="index" :text="markdownContent"></v-md-preview>
  </div>
  <footer-mark />
</template>


<style scoped>
.markdown-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 5%;
}
.markdown-container h1 {
  border-left: 4px #e36474 solid;
  padding-left: 12px;
}
.md-preview {
  width: 50%;
}
.go-home {
  position: absolute;
  left: 10%;
  top: 10px;
  text-align: center;
  font-size: 5vh;
  cursor: pointer;
}

.markdown-container blockquote {
  background-color: rgba(255, 229, 100, 0.3);
  border-left-color: #ffe564;
  border-left-width: 9px;
  border-left-style: solid;
  padding: 20px 45px 20px 26px;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -30px;
}
.markdown-container a {
  text-decoration: none;
  color: #fa744f;
  font-weight: 600;
}
.markdown-container ul li {
  margin-bottom: 6px;
}

.go-github-edit {
  margin-top: 20px;
  padding-left: 10px;
}

.go-github-edit a {
  border-bottom: 1px solid #fa744f;
  padding-bottom: 4px;
}
.go-github-edit a span {
  margin-left: 4px;
}
.github-contributors {
  margin-top: 30px;
  border-top: 3px solid #eee;
  padding-top: 10px;
  color: #444;
}
.github-contributors-title {
  font-size: 20px;
  margin-bottom: 10px;
}
.github-contributors-info a {
  cursor: pointer;
  color: #444;
}
.github-contributors-info img {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 4px;
}
.github-contributors-info span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  margin-right: 16px;
}
</style>
