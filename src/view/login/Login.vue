<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow />

   <van-button @click="onSubmit">点我</van-button>
  </div>
</template>
<script>
  import {login} from '@/request/api/user.js'
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    created() {

    },
    methods: {
      onSubmit(values) {
        login({
          us:'02971@qq.com',
          ps:'85996',
        }).then(res => {
          console.log(res);
          if (res.err===0) {
            this.$toast({
              message: res.msg,
              duration: 1000
            })
          }

        }).catch(err => {
          console.log(err);
        })


      },
    },

  }
</script>
<style lang="less">

</style>
