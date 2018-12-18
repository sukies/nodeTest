<template>
  <Layout class="content">
    <Layout class="content-wrapper">
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu
          active-name="all"
          theme="light"
          width="auto"
          @on-select="menuChange"
        >
          <MenuItem name="all"> 全部 </MenuItem>
          <Submenu v-for="item in menu" :key="item.id" :name="item.id">
            <template slot="title">
              {{ item.label }}
            </template>
            <MenuItem
              v-for="val in item.children"
              :key="val.id"
              :name="val.id"
              >{{ val.label }}</MenuItem
            >
          </Submenu>
        </Menu>
      </Sider>

      <Layout :style="{ padding: '0 24px 24px' }" class="main">
        <Content :style="{ padding: '0 50px' }" class="main-wrapper">
          <ul>
            <IconList v-for="item in iconList" :icon="item" :key="item.id" />
          </ul>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
import IconList from "../components/IconList";
import { search, getClassify } from "../units/api";
export default {
  data() {
    return {
      iconList: [],
      menu: []
    };
  },
  methods: {
    menuChange(e) {
      let id = isNaN(e) ? "none":e;
      search({
        id: id
      }).then(res => {
        this.iconList = res;
      });
    }
  },
  components: { IconList },

  created() {
    search().then(res => {
      this.iconList = res;
    });
    getClassify()
      .then(res => {
        this.menu = res;
        console.log(this.menu);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped type="text/less" lang="less">
.main {
  margin: 40px 0;
}
</style>
