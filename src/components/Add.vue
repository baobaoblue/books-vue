<template>
  <div>
     <MHeader :back="true">添加</MHeader>
     <div class="detaliCon">
       <ul>
         <li>
          <label for="bookCover">封面</label>
          <input type="text" v-model="book.bookCover"  id="bookCover">
        </li>
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
          <button @click="add">确认添加</button>
        </li>
      </ul>
     </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader'
import {addBook} from '../api/index'
export default {
  name: '',
  data() { 
    return {
      book:{}
    }
  },
  methods:{
    async add(){
      await addBook(this.book)
      this.$router.push('/list')
    }
  },
  components:{
    MHeader
  }
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