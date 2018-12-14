<template>
    <ul>
        <IconList v-for="item in iconList" :icon="item" :key="item.id"/>
    </ul>
</template>
<script>
import IconList from "../components/IconList";
import {search} from '../units/api'
export default {
  data() {
    return {
      iconList: []
    };
  },
  methods: {},
  components: { IconList },

  created() {
    search().then(res=>{
      this.iconList=res
    })
  }
};
</script>
<style scoped type="text/less" lang="less">

</style>
