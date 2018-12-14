<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" :active-name="getIndex">
            <div class="layout-logo"></div>
            <div class="layout-nav">
              <router-link to="/">
                <MenuItem name="1">
                  <Icon type="ios-navigate"></Icon>
                  List
                </MenuItem>
              </router-link>
              <router-link to="/upload">
                <MenuItem name="2">
                  <Icon type="ios-keypad"></Icon>
                  Upload
                </MenuItem>
              </router-link>
              <router-link to="/edit">
                <MenuItem name="3">
                  <Icon type="ios-analytics"></Icon>
                  Edit
                </MenuItem>
              </router-link>
              <router-link to="/add">
                <MenuItem name="4">
                  <Icon type="ios-paper"></Icon>
                  Add Icon
                </MenuItem>
              </router-link>
            </div>
          </Menu>
        </Header>
        <Content :style="{padding: '0 50px'}">
          <Card class="content">
          <router-view/>
          </Card>
        </Content>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {
    getIndex() {
      const obj = {
        index: "1",
        upload: "2",
        edit: "3"
      };
      return obj[this.$router.history.current.name || "index"];
    }
  },
  created() {
    console.log(this.$router.history.current.name);
  }
};
</script>
<style type="text/less" lang="less" scoped>
/*@import "css/theme.less";*/
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 100vh;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}

.content {
  margin: 20px 0;
  background: transparent;
  border: 0;
  min-height: 80%;
  min-height: 80vh;
  &:hover {
    border: 0;
    box-shadow: 0 0 0;
  }
}
.ivu-card-body {
  overflow-x: auto;
}
  li ul{
    /*list-style: none;*/
    /*margin: 0;*/
    /*padding: 0;*/
  }
</style>
