<template>
  <div class="">
    <MHeader :back="false">列表</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <div class="container">
        <ul>
          <router-link  v-for="(book,index) in books" :key="index" :to="{ name: 'detail', params: { bid: book.bookId }}" tag="li">
            <div class="bookImg">
               <img v-lazy="book.bookCover" class="cover">
            </div>
            <div class="bookDetail">
              <h3>{{book.bookName}}</h3>
              <p>{{book.bookInfo}}</p>
              <div class="itemFooter">
                <div class="price">
                  <h2>{{book.bookPrice | toFixed(2)}}</h2>
                </div>
                <div class="btns">
                  <i class="iconfont icon-shanchu" @click.stop="remove(book.bookId)"></i>
                  &nbsp;&nbsp;
                  <i class="iconfont icon-gouwuche" @click.stop="addCart(book)"></i>
                </div>
              </div>
            </div>
          </router-link>
        </ul>
        <a @click="more" v-if="isLoading">加载更多</a>
        <p class="none" v-else>没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader'
import {pagination,removeBook} from '../api/index'
import * as Types from '../store/mutations-type'
export default {
  name: '',
  data() { 
    return {
      books:[],
      offset:0,
      hasMore:true,
      isLoading:false
    }
  },
  mounted(){
    let scroll = this.$refs.scroll;
    let top = scroll.offsetTop;
    let distance = 0
    let isMove = false
    scroll.addEventListener('touchstart',(e)=>{
      if(scroll.scrollTop !==0 && scroll.offsetTop == top) return 
      let start = e.touches[0].pageY
      let move = (e)=>{
        isMove = true
        let current = e.touches[0].pageY
        distance = current - start
        if(distance > 0){
          if(distance <= 50){
            scroll.style.top = distance + top +'px'
          }else{
            distance = 50
            scroll.style.top = top + 50 + 'px'
          } 
        }else{
          scroll.removeEventListener('touchmove',move)
          scroll.removeEventListener('touchend',end)
        }
      }
      let end = (e) => {
        if(!isMove) return
        isMove = false
        clearInterval(this.timer1)
        this.timer1 = setInterval(()=>{
          if(distance <= 0){
            clearInterval(this.timer1)
            distance = 0
            scroll.style.top = top + 'px'
            scroll.removeEventListener('touchmove',move)
            scroll.removeEventListener('touchend',end)
            this.books = []
            this.offset = 0 
            this.getData()
            return
          }
          distance -= 1
          scroll.style.top =top + distance + 'px'
        },1)
      }
      scroll.addEventListener('touchmove',move);
      scroll.addEventListener('touchend',end);
    },false)
  },
  created(){
    this.getData()
  },
  methods:{
    more(){
      this.getData()
    },
    addCart(book){
      this.$store.commit(Types.ADD_CART,book)
    },
    loadMore(){
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let{scrollTop,clientHeight,scrollHeight} = this.$refs.scroll
        if(scrollTop + clientHeight + 20 > scrollHeight){
          this.getData();
        }
      },50)
    },
    async getData(){
      if(this.hasMore && !this.isLoading){
        this.isLoading = true
        let {hasMore,books} = await pagination(this.offset);
        this.books = [...this.books,...books];
        this.hasMore = hasMore;
        this.isLoading = false;
        this.offset = this.books.length;
      }
    },
    async remove(id){
      await removeBook(id) ;
      this.books = this.books.filter(item=> item.bookId !==id);
    }
    
  },
  components:{
    MHeader
  },
  filters:{
		toFixed(num,param){
			return '￥' + num.toFixed(param)
		}
	}
  
 }
</script>

<style lang="scss" scoped>
ul{
  display: inline-block;
  margin: 15px 0;
  li{
    width: 100%;
    display: inline-block;
    margin-bottom: 10px;
    .bookImg{
      display: inline-block;
      width: 130px;
    }
    .bookDetail{
      display: inline-block;
      width:calc(100% - 150px);
      margin-left: 10px;
      vertical-align: top;
    }
    img{
      width:100%;
      height: 140px;
    }
    .cover{
      object-fit: cover;
    }
    h3{
      font-size: 30px;
      padding-bottom:10px;
    }
    h2{
      color:orange;
    }
    p{
      line-height: 25px;
      padding-bottom:10px;
    }
  }
}
.itemFooter{
  width: 100%;
  .price{
    float: left;
  }
  .btns{
    float: right;
    line-height: 30px;
  }
}
a{
  text-align: center;
  color:#409EFF;
  display: inline-block;
  line-height: 50px;
  width: 100%;
  margin-bottom:20px;
}
.none{
  text-align: center;
  color:#666;
  padding:30px 0;
}
</style>