<template>
    <div>
        <Row>
            <Col span="8" class="name">icon名字：</Col>
            <Col span="16"><Input v-model="value" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">标签：</Col>
            <Col span="16"><Input v-model="value" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">标签：</Col>
            <Col span="16"><Cascader :data="data" v-model="value1"  class="input"/></Col>
        </Row>
        <Row>
            <Col span="8" class="name">1倍图地址：</Col>
            <Col span="16"><Input v-model="value" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">2倍图地址：</Col>
            <Col span="16"><Input v-model="value" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name">3倍图地址：</Col>
            <Col span="16"><Input v-model="value" class="input" /></Col>
        </Row>
        <Row>
            <Col span="8" class="name"/>
            <Col span="16">  <Button type="primary">确定</Button></Col>
        </Row>
    </div>
</template>
<script>
import { getClassify } from "../units/api";
export default {
  data() {
    return {
      value: "",
      value1: [],
      data: []
    };
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
