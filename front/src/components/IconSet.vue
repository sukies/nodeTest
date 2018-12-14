<template>
    <div>
        <img :src="img" class="image_show">
    </div>
</template>

<script>

  export default {
    name: "IconSet",
    props: {
      img:{}
    },
    data() {
      return {
        modal1: false
      };
    },
    methods: {

    },
    created() {
      console.log(this.img);
    },
    component: []
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
    .image_show {
        max-width: 200px;
        max-height: 200px;
        text-align: center;
    }
</style>
