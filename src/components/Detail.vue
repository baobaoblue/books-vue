<template>
  <div>
    <MHeader :back="true">详情</MHeader>
    <div class="detaliCon">
      <ul>
        <li>
          <label for="bookName">书名</label>
          <input type="text" v-model="book.bookName"  id="bookName">
        </li>
        <li>
          <label for="bookInfo">介绍</label>
          <textarea type="text" v-model="book.bookInfo"  id="bookInfo"></textarea>
        </li>
        <li>
          <label for="bookPrice">价格</label>
          <input type="text" v-model.number="book.bookPrice"  id="bookPrice">
        </li>
        <li>
          <button @click='update'>确认修改</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader'
import {findOneBook,updateBook} from '../api/index'
export default {
  name: '',
  data() { 
    return {
      book:{}
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      this.book = await findOneBook(this.bid)
      Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/list')
    },
    async update(){
      await updateBook(this.bid,this.book)
      this.$router.push('/list')
    }
  },
  watch:{
    $route(){
      this.getData()
    }
  },
  computed:{
    bid(){
      return this.$route.params.bid;
    }
  },
  components:{
    MHeader
  },
 }
</script>

<style lang="scss" scoped>
.detaliCon{
  position: absolute;
  top:50px;
  left: 0;
  right: 0;
  bottom:0;
  background: #fff;
  padding: 15px 10px;
  z-index: 999;
}
ul{
  li{
    display: inline-block;
    width: 100%;
    height: 30px;
    margin-bottom:10px;
    label{
      vertical-align: top;
      line-height: 30px;
    }
    input{
      border:1px solid #ddd;
      height: 30px;
      width: 300px;
      padding:0 5px;
      font-size: 14px;
      color:#333;
    }
    textarea{
      height: 100px;
      width: 300px;
      border:1px solid #ddd;
      padding:5px;
      font-size: 14px;
      color:#333;
    }
    button{
      margin: 30px 0 0 0;
      height: 45px;
      width: 100%;
      text-align: center;
      background: orange;
      color:#fff;
      border:none;
      border-radius: 25px;
      font-size: 16px;
    }
  }
}
</style>