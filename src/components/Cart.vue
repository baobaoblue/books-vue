<template>
  <div>
    <MHeader :back="false">购物车</MHeader>
    <div class="content">
      <div class="container">
        <ul>
          <li v-for="(cart,index) in cartList" :key="index">
            <div class="bookImg">
                <img :src="cart.bookCover" class="cover">
              </div>
              <div class="bookDetail">
                <h3>{{cart.bookName}}</h3>
                <p>{{cart.bookInfo}}</p>
                <div class="itemFooter">
                  <div class="price">
                    <h2>{{cart.bookPrice | toFixed(2)}}</h2>
                  </div>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footerCon">
      <div>共{{count}}本</div>
    </div>
  </div>
</template>

<script>
import MHeader from '../base/MHeader'
import { mapState,mapGetters } from 'vuex'
export default {
  name: '',
  data() { 
    return {

    }
  },
  computed:{
    ...mapState(['cartList']),
    ...mapGetters(['count'])
    
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

<style lang='scss' scoped>
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
.content{
  position:absolute;
  top:50px;
  bottom:50px;
  height: calc(100% - 150px);
  width: 100%;
  overflow: auto;
}
.footerCon{
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  padding: 0 15px;
  line-height: 50px;
  color:#666;
  font-size: 16px;
}
.itemFooter{
  width: 100%;
  .price{
    float: left;
  }
}
</style>