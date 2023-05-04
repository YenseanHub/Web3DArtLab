<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  msg2: {
    type: String,
    required: true
  },
  msg3: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h2 class="lightgreen">{{ msg }}</h2>
    <h1 class="green">{{ msg2 }}</h1>
    <h1 class="colorful">{{ msg3 }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 4.2rem;
  top: -10px;
}
h2 {
  font-size: 2.5rem;
}
h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.greetings h2,
.greetings h1 {
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.colorful {
  background: linear-gradient(to right, #BC95C6, #7dc4cc) 0 / 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
