<template>
    <div>
        <div class="drag-wrapper"
             @dragenter="dragenter"
             @dragover="dragover"
             @dragleave="dragleave"
             @drop="drop"
        ></div>
        <div v-if="!!files" v-for="item in files">
            <ImgCanvas :img="item"/>
        </div>
        <!--<input type="file" @change="inputFile">-->
        <!--<input type="file" @change="fileImgChange">-->
        <!--<img :src="changeImg">-->
        <!--<Button @click="downImg">下载</Button>-->
    </div>
</template>
<script>
  import IconList from "../components/IconList";
  import ImgCanvas from "../components/ImgCanvas";
  import {iconList} from "../data";
  import imageCompress from '../units/imageCompress/index'

  export default {
    data() {
      return {
        iconList: iconList.data,
        canvasCtx: {},
        sliderValue: 25,
        files: [],
        changeImg: ""
      };
    },
    methods: {
      fileImgChange(e) {
        console.log(e);
      },
      dragenter(e) {
        e.target.style.border = "1px dotted #d32919";
        e.preventDefault();
        e.stopPropagation();
      },
      dragover(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      dragleave(e) {
        e.target.style.border = "1px dotted #ccc";
        e.preventDefault();
        e.stopPropagation();
      },
      drop(e) {
        e.preventDefault();
        e.stopPropagation();
        var df = e.dataTransfer;
        var dropFiles = []; // 存放拖拽的文件对象

        if (df.items !== undefined) {
          // Chrome有items属性，对Chrome的单独处理
          for (var i = 0; i < df.items.length; i++) {
            var item = df.items[i];
            // 用webkitGetAsEntry禁止上传目录
            if (item.kind === "file" && item.webkitGetAsEntry().isFile) {
              var file = item.getAsFile();
              dropFiles.push(file);
            }
          }
        }
        this.files = dropFiles;
        console.log(this.files)
        // this.drewCanvas(this.file);
      },
      // 下载
      downImg() {
        var MIME_TYPE = "image/png";
        var dlLink = document.createElement("a");
        dlLink.download = "ceshi.png";
        dlLink.href = this.changeImg;
        console.log(this.changeImg.toString().length);
        dlLink.dataset.downloadurl = [
          MIME_TYPE,
          dlLink.download,
          dlLink.href
        ].join(":");
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
      }
    },
    components: {IconList, ImgCanvas},

    mounted() {
      // let canvas = document.getElementById("canvas");
      // this.canvasCtx = canvas.getContext("2d");
    }
  };
</script>
<style scoped type="text/less" lang="less">
    .drag-wrapper {
        width: 200px;
        height: 100px;
        border: 1px solid #ccc;
        background-image:
                -webkit-gradient(linear, 0% 0, 50% 50%, color-stop(.5, #f5a623), color-stop(.5, transparent), to(transparent)),
                -webkit-gradient(linear, 50% 50%, 100% 100%, color-stop(.5, transparent), color-stop(.5, #f5a623), to(#f5a623)),
                -webkit-gradient(linear, 50% 0, 50% 50%, color-stop(1, lightskyblue), color-stop(1, transparent), to(transparent)),
                -webkit-gradient(linear,0 50%,50% 50% ,color-stop(1, transparent), color-stop(1, lightskyblue), to(transparent)) ;
        /*);*/
        /*background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #555), color-stop(.25, transparent), to(transparent)),*/
        /*-webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, #555), color-stop(.25, transparent), to(transparent)),*/
        /*-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.75, transparent), color-stop(.75, #555)),*/
        /*-webkit-gradient(linear, 0 100%, 100% 0, color-stop(.75, transparent), color-stop(.75, #555));*/
        background-size: 20px 20px;
        /*background-position: 20px 0;*/
        background-position: 10px 0,20px -11px,0 0,0 0;
        /*background-position: 0,0,-10px 10px,0;*/
        /*background-repeat: repeat-y;*/
    }

    .canvas {
        border: 1px solid #ccc;
    }
</style>
