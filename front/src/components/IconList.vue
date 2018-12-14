<template>
    <li class="icon-wrapper">
        <div @click="show">
            <div class="img-wrapper"><img :src="icon.def||icon.two_mul||icon.three_mul"></div>
            <p class="name">{{icon.name}}</p>
        </div>
        <Modal v-model="modal1"
               title="图标详情"
               @on-ok="ok"
               @on-cancel="cancel">
            <Tabs value="def">
                <TabPane label="默认" name="def" v-if="icon.def">
                    <IconSet :img="icon.def"/>
                </TabPane>
                <TabPane label="2倍图" name="two_mul" v-if="icon.two_mul">
                    <IconSet :img="icon.two_mul"/>
                </TabPane>
                <TabPane label="3倍图" name="three_nul" v-if="icon.three_mul">
                    <IconSet :img="icon.three_mul"/>
                </TabPane>
            </Tabs>
        </Modal>
    </li>
</template>

<script>
  import IconSet from "./IconSet";

  export default {
    name: "IconList",
    props: {
      icon: {}
    },
    data() {
      return {
        modal1: false
      };
    },
    methods: {
      ok() {
        // this.$Message.info("Clicked ok");
      },
      cancel() {
        // this.$Message.info("Clicked cancel");
      },
      show() {
        this.modal1 = true;
      }
    },
    created() {
      console.log(this.icon);
    },
    components: {IconSet}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
    .image_show {
        max-width: 200px;
        max-height: 200px;
        text-align: center;
    }

    .icon-wrapper {
        display: inline-block;
        margin: 10px;
        padding: 10px 5px;
        background: white;
        width: 100px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s;
        &:hover {
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            border-color: #eee;
        }
        .img-wrapper {
            max-width: 50px;
            max-height: 50px;
            margin: 0 auto;
            vertical-align: middle;
            line-height: 50px;
            img {
                max-width: 100%;
            }
        }
    }
</style>
