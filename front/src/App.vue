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
              <!--<router-link to="/upload">-->
                <!--<MenuItem name="2">-->
                  <!--<Icon type="ios-keypad"></Icon>-->
                  <!--Upload-->
                <!--</MenuItem>-->
              <!--</router-link>-->
              <!--<router-link to="/edit">-->
                <!--<MenuItem name="3">-->
                  <!--<Icon type="ios-analytics"></Icon>-->
                  <!--Edit-->
                <!--</MenuItem>-->
              <!--</router-link>-->
              <router-link to="/add">
                <MenuItem name="2">
                  <Icon type="ios-paper"></Icon>
                  Add Icon
                </MenuItem>
              </router-link>
            </div>
          </Menu>
        </Header>
        <!--<Layout class="content">-->
          <!--<Layout class="content-wrapper">-->
            <!--<Sider hide-trigger :style="{ background: '#fff' }">-->
              <!--<Menu-->
                <!--active-name="1-2"-->
                <!--theme="light"-->
                <!--width="auto"-->
                <!--:open-names="['1']"-->
              <!--&gt;-->
                <!--<Submenu name="1">-->
                  <!--<template slot="title">-->
                    <!--<Icon type="ios-navigate"></Icon>-->
                    <!--Item 1-->
                  <!--</template>-->
                  <!--<MenuItem name="1-1">Option 1</MenuItem>-->
                  <!--<MenuItem name="1-2">Option 2</MenuItem>-->
                  <!--<MenuItem name="1-3">Option 3</MenuItem>-->
                <!--</Submenu>-->
                <!--<Submenu name="2">-->
                  <!--<template slot="title">-->
                    <!--<Icon type="ios-keypad"></Icon>-->
                    <!--Item 2-->
                  <!--</template>-->
                  <!--<MenuItem name="2-1">Option 1</MenuItem>-->
                  <!--<MenuItem name="2-2">Option 2</MenuItem>-->
                <!--</Submenu>-->
                <!--<Submenu name="3">-->
                  <!--<template slot="title">-->
                    <!--<Icon type="ios-analytics"></Icon>-->
                    <!--Item 3-->
                  <!--</template>-->
                  <!--<MenuItem name="3-1">Option 1</MenuItem>-->
                  <!--<MenuItem name="3-2">Option 2</MenuItem>-->
                <!--</Submenu>-->
              <!--</Menu>-->
            <!--</Sider>-->
            <!--<Layout :style="{ padding: '0 24px 24px' }" class="main">-->
              <!--&lt;!&ndash;<Breadcrumb :style="{ margin: '24px 0' }">&ndash;&gt;-->
                <!--&lt;!&ndash;<BreadcrumbItem>Home</BreadcrumbItem>&ndash;&gt;-->
                <!--&lt;!&ndash;<BreadcrumbItem>Components</BreadcrumbItem>&ndash;&gt;-->
                <!--&lt;!&ndash;<BreadcrumbItem>Layout</BreadcrumbItem>&ndash;&gt;-->
              <!--&lt;!&ndash;</Breadcrumb>&ndash;&gt;-->
              <!--<Content :style="{ padding: '0 50px' }" class="main-wrapper">-->
                <!--&lt;!&ndash;<Card class="contents"> &ndash;&gt;-->
                  <!--<router-view />-->
                <!--&lt;!&ndash;</Card>&ndash;&gt;-->
              <!--</Content>-->
            <!--</Layout>-->
          <!--</Layout>-->
        <!--</Layout>-->
        <Content :style="{padding: '0 50px'}">
        <Card class="content">
        <router-view/>
        </Card>
        </Content>
        <!--<Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>-->
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
  background: transparent;
  border: 0;
  /*min-height: 100%;*/
  /*min-height: 100vh;*/
  &:hover {
    border: 0;
    box-shadow: 0 0 0;
  }
}
.ivu-card-body {
  overflow-x: auto;
}
li ul {
  /*list-style: none;*/
  /*margin: 0;*/
  /*padding: 0;*/
}
  .main{
    position: relative;
  }
  .content-wrapper{
    margin: 0;
  }
  .main-wrapper{
    margin:40px 0;
  }
</style>
