<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import MainHome from '../components/MainHome.vue'
import FooterMark from '../components/FooterMark.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuList = [
  {
    id: 'sapling',
    iconUrl: '/icon/sapling.png',
    name: '苗Sapling'
  },
  {
    id: 'tree',
    iconUrl: '/icon/tree.png',
    name: '树Tree'
  },
  {
    id: 'forest',
    iconUrl: '/icon/forest.png',
    name: '森Forest'
  },
  {
    id: 'roadMap',
    iconUrl: '/icon/roadMap.png',
    name: '路RoadMap'
  },
  {
    id: 'apiDoc',
    iconUrl: '/icon/apiDoc.png',
    name: 'Threejs \xa0 文档'
  }
]
function navTo(id) {
  if (id == 'apiDoc') {
    window.open('https://threejs.yensean.com', '_blank')
  } else {
    router.push(id)
  }
}
</script>

<template>
  <div class="github-link">
    <img
      alt="github logo"
      class="github-logo"
      src="/icon/github.png"
      width="48"
      height="48"
    />
    <a href="https://github.com/YenseanHub/Web3DArtLab" target="_blank" rel="noopener">Github</a>
  </div>
  <header>
    <img
      alt="ArtLab logo"
      class="logo"
      src="@/assets/icons-treeHole.png"
      width="182"
      height="182"
    />
    <div class="wrapper">
      <HelloWorld msg="Welcome to the world of" msg2="Web3D" msg3="Art Lab" />
    </div>
    <div class="item-list">
      <div v-for="ele in menuList" :key="ele.name" class="item-container" @click="navTo(ele.id)">
        <img alt="sapling logo" class="item-logo" :src="ele.iconUrl" />
        <p class="item-text">{{ ele.name }}</p>
      </div>
    </div>
  </header>
  <div class="info-container">
    <div class="info-item">
      <p class="info-text">公众号 &darr;</p>
      <img alt="infoCode" class="info-code" src="/QRCode/qrcode.jpg" />
    </div>
    <div class="info-item">
      <p class="info-text">这是我 &darr;</p>
      <img alt="infoCode" class="info-code" src="/QRCode/wechat.png" />
    </div>
    <div class="info-item">
      <p class="info-text">赐杯喜茶吧 &darr;</p>
      <img alt="infoCode" class="info-code" src="/QRCode/alipay.png" />
    </div>
  </div>
  <MainHome />
  <FooterMark />
</template>

<style scoped>
.github-link {
  position: absolute;
  right: 5%;
  top: 5%;
  font-size: 2.5vh;
  display: flex;
  place-items: center;
}
.github-logo {
  margin-right: 10px;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  left: 20%;
  position: absolute;
  top: 11%;
  user-select: none;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.item-list {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: space-between;
}
.item-container {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30%;
  margin-left: 30%;
}
.item-logo {
  width: 48px;
  height: 48px;
}
.item-text {
  color: whitesmoke;
  padding-left: 20px;
  font-size: 2.5vh;
}
.info-container {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0px;
  bottom: 0px;
}
@media (max-width: 1700px) {
  .info-container {
    flex-direction: column;
  }
}

.info-item {
  margin-right: 10px;
}
.info-text {
  color: whitesmoke;
  font-size: 2.5vh;
}
.info-code {
  width: 135px;
  height: 135px;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
