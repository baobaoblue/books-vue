<template>
  <div>
        <template>
            <swiper :options="swiperOption">
                <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                  <img :src="slide" alt="" width="100%">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </template>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Swiper',
  props:['swiperSlides'],
  data() { 
    return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
 }
</script>

<style scoped>

</style>