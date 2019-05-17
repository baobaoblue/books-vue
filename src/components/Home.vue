<template>
  <div>
    <MHeader :back="false">首页</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <router-link v-for="(hot,index) in hotBooks" :key="index" :to="{ name: 'detail', params: { bid: hot.bookId }}" tag="li">
              <img :src="hot.bookCover">
              <b>{{hot.bookName}}</b>
            </router-link>
          </ul>
        </div>
      </template> 
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader'
import Swiper from '../base/Swiper'
import Loading from '../base/Loading'
import {getAll} from '../api/index'
export default {
  name: '',
  created(){
    this.getData()
  },
  data() { 
    return {
      sliders:[],
      hotBooks:[],
      loading:true
    }
  },
  methods:{
    async getData(){
        let [sliders,hotBooks] = await getAll()
        this.sliders = sliders
        this.hotBooks = hotBooks
        this.loading = false
    }
  },
  components:{
    MHeader,
    Swiper,
    Loading
  }
 }
</script>

<style lang="scss" scoped>
h3{
  line-height: 40px;
  color:#444;
}
ul{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  li{
    flex-direction:column;
    justify-content: space-around;
    align-content: space-between;
    width:calc(50% - 10px);
    padding: 0 5px;
    img{
      width:100%;
    }
    b{
      color:#333;
      font-size: 16px;
      line-height:50px;
    }
  }
}
</style>