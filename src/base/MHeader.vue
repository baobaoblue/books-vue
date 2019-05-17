<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    back:{
      type:Boolean,
      default:false
    }
  },
  data() { 
    return {

    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
 }
</script>

<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #409EFF;
    color:#fff;
    font-weight:bold;
    text-align: center;
    line-height: 50px;
    i{
      position:absolute;
      left:10px;
      font-size: 20px;
    }
}
</style>