<template>
  <div>edit</div>
</template>
<script>
import IconList from "../components/IconList";
import { iconList } from "../data";
import axios from "../units/axios";
export default {
  data() {
    return {
      iconList: iconList.data
    };
  },
  methods: {},
  components: { IconList },

  created() {
  }
};
</script>
<style scoped type="text/less" lang="less"></style>
