<template>
    <div>
        <Row>
            <Col span="8" class="name">icon名字：</Col>
            <Col span="16"><Input v-model="name" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">标签：</Col>
            <Col span="16"><Input v-model="tag" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">所在类目：</Col>
            <Col span="16"><Cascader :data="data" v-model="classify"  class="input"/></Col>
        </Row>
        <Row>
            <Col span="8" class="name">1倍图地址：</Col>
            <Col span="16"><Input v-model="image1" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">2倍图地址：</Col>
            <Col span="16"><Input v-model="image2" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">3倍图地址：</Col>
            <Col span="16"><Input v-model="image3" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name"/>
            <Col span="16">  <Button type="primary" @click="submit">确定</Button></Col>
        </Row>
    </div>
</template>
<script>
import { getClassify,addIcon } from "../units/api";
export default {
  data() {
    return {
      data: [],
        name:'',
        tag:'',
        classify:[],
        image1:'',
        image2:'',
        image3:'',
    };
  },
    methods:{
      submit(){
          addIcon({
                name:this.name || "",
                    tag:this.tag || "",
                   classify:this.classify?this.classify[this.classify.length-1] :"",
                   def:this.image1 || "",
                   two_mul:this.image2 || "",
                   three_mul:this.image3 || ""
            })
                    .then(res => {
                        this.data = res;
                    })
                    .catch(err => {
                        console.log(err);
                    });
        }
    },
  created() {
    getClassify()
      .then(res => {
        this.data = res;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped type="text/less" lang="less">
.name {
  text-align: right;
  padding: 0 10px;
  height: 50px;
  line-height: 30px;
}
.input {
  width: 300px;
}
</style>
