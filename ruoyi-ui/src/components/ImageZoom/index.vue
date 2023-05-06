<template>
  <div style="position: relative;">
    <div class="image-container">
      <img :src="url.src" :style="{ transform: isHover ? 'scale(1.2)' : 'scale(1)' }" @mouseover="isHover = true"
        @mouseleave="isHover = false">
    </div>
    <div style="position: absolute; background: #fff; bottom: 0;right: 0;width: 40%;">
      <div>
        <a>超级旅游险</a>
      </div>
      <a>
        <h4>保费低至99，最高理赔20万！</h4>
      </a>
      <div>
        <a>2020/9/10 </a>
        <a>中国人寿</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: Object,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isHover: false
    }
  }
}
</script>  
<style>
.image-container {
  overflow: hidden;
}

img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease-out;
}
</style>