<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-liebiao"></i>
            <span>列表</span>
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-tianjia"></i>
            <span>添加</span>
        </router-link>
        <router-link to="/cart">
            <i class="iconfont icon-shoucang"></i>
            <span>购物车</span>
        </router-link>
    </div>
</template>
<script>
export default {
  name: '',
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" scoped>
.footer{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top:1px solid #ccc;
    a{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        color:rgb(179, 216, 255);
    }
}
a.router-link-active{
    color:#409EFF;
    font-weight:bold;
}
</style>