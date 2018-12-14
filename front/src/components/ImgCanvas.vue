<template>
    <li class="canvas-wrapper">
        <canvas :id="id" class="canvas" :width="imgWidth+'px'" :height="imgHeight+'px'" @mousemove="onmouseover">
            当前浏览器不支持canvas
        </canvas>
        <canvas class="oldCanvas" :id="'old_'+id">当前浏览器不支持canvas</canvas>
        <div>
            <Select v-model="imgType" @on-change="imgTypeChange" style="width:200px">
                <Option v-for="item in imgTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            原图大小：{{(img.size/1024).toFixed(2)}}KB,压缩后大小：{{newImageSize}}KB
            <Button @click="downImg">下载</Button>
            <Slider v-model="sliderValue" show-input @on-input="sliderInput"/>
        </div>
    </li>
</template>

<script>
  export default {
    name: "",
    props: {
      img: {}
    },
    data() {
      return {
        sliderValue: 75,
        id: "canvas_" + Math.floor(Math.random() * 100000),
        canvasCtx: "",
        canvasDom: "",
        changeImg: "",
        imgWidth: 0,
        imgHeight: 0,
        initialImg: {},
        imgType: "",
        imgName: "",
        imgTypeList: [
          {
            value: "image/jpeg",
            label: "image/jpeg"
          },
          {
            value: "image/png",
            label: "image/png"
          },
          {
            value: "image/webp",
            label: "image/webp"
          }
        ],
        zoom: 1,
        newImageSize:0
      };
    },
    created() {
    },
    mounted() {
      let that = this
      this.imgType = this.img.type;
      this.imgName = this.img.name.replace(/\.[a-z]*$/, "");
      this.canvasDom = document.getElementById('old_' + this.id);

      this.canvasCtx = this.canvasDom.getContext("2d");
      let reader = new FileReader();
      reader.readAsDataURL(this.img);
      reader.onload = () => {
        this.initialImg = new Image();
        this.initialImg.src = reader.result;
        this.initialImg.onload = function () {
          that.imgWidth = that.initialImg.width
          that.imgHeight = that.initialImg.height
          that.canvasDom.width = that.imgWidth
          that.canvasDom.height = that.imgHeight
          that.getWidth(that.imgWidth, that.imgHeight)
          that.drewCanvas(that.sliderValue / 100, that.initialImg.width, that.initialImg.height);
        };
      };
    },

    methods: {
      // 绘制压缩后图片
      drewCanvas(option, x, y) {
        this.canvasCtx.clearRect(0, 0, x, y);
        if (this.imgType==='image/jpeg'){
          this.canvasCtx.beginPath();
          this.canvasCtx.lineWidth = "0";
          this.canvasCtx.rect(0, 0, x,y);
          this.canvasCtx.stroke();
          this.canvasCtx.fillStyle = '#ffffff';
          this.canvasCtx.fill();
        }
        this.canvasCtx.drawImage(this.initialImg, 0, 0);
        this.changeImg = this.canvasDom.toDataURL(this.imgType, option);
        this.newImage = new Image();
        this.newImage.src = this.changeImg;
        let that = this;
        this.newImage.onload = () => {
          that.drew(that.canvasX / 2)
          that.getImageWidth()
        };
      },
      //滑动事件
      sliderInput() {
        this.drewCanvas(this.sliderValue / 100, this.initialImg.width, this.initialImg.height);
      },
      // 图片格式选择
      imgTypeChange() {
        this.drewCanvas(this.sliderValue / 100, this.initialImg.width, this.initialImg.height);
      },
      //分割线滑动
      onmouseover(e) {
        this.drew(e.offsetX)
      },
      /**
       * 绘制预览canvas
       * @param x 分割线x轴
       */
      drew(x) {
        this.offsetX = x;
        let canvasCtx = document.getElementById(this.id).getContext("2d");
        canvasCtx.clearRect(0, 0, this.canvasX, this.canvasY);
        const removeX = x - this.canvasX / 2
        // 原图，左
        canvasCtx.drawImage(this.initialImg,
          0, 0, this.canvasX / 2 + removeX, this.canvasY,
          0, 0, (this.canvasX / 2 + removeX) / this.zoom, this.canvasY / this.zoom);
        //压缩后，右
        canvasCtx.drawImage(this.newImage,
          this.canvasX / 2 + removeX, 0, this.canvasX, this.canvasY,
          (this.canvasX / 2 + removeX) / this.zoom, 0, this.canvasX / this.zoom, this.canvasY / this.zoom);
        //分割线
        canvasCtx.beginPath();
        canvasCtx.lineWidth = "2";
        canvasCtx.strokeStyle = "#eee";
        canvasCtx.rect(x, 0, 1, this.canvasY);
        canvasCtx.stroke();
        //文字
        canvasCtx.font = "20px Arial";
        let txt = "压缩";
        let fontWidth= canvasCtx.measureText(txt).width;
        canvasCtx.fillText(txt, this.canvasX -fontWidth<this.offsetX?this.offsetX:this.canvasX -fontWidth, 20);
        canvasCtx.fillText("原图",fontWidth<this.offsetX?0:this.offsetX-fontWidth, 20);
      },
      //下载
      downImg() {
        let MIME_TYPE = this.imgType;
        let dlLink = document.createElement("a");
        dlLink.download = this.imgName;
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
      },
      /**
       * 获取canvas的长宽，图片缩放大小
       */
      getWidth(x, y) {
        if (y > 800 || x > 400) {
          if (x > y) {
            this.canvasY = 400
            this.canvasX = 800 * this.canvasY / x
            this.zoom = this.canvasX / 800
          } else {
            this.canvasX = 800
            this.canvasY = 400 * this.canvasX / y
            this.zoom = this.canvasY / 400
          }
        } else {
          this.canvasX = x
          this.canvasY = y
        }
      },
      getImageWidth(file){
        let imgName = Math.floor(Math.random()*10000);
        let arr = this.changeImg.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let suffix = mime.split("/")[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const newFile =new File([u8arr], `${imgName}.${suffix}`, {type: mime})
        console.log(newFile);
        this.newImageSize= (newFile.size/1024).toFixed(2)
      }
    },
    components: {

    },
    component: []
  };


</script>

<style scoped lang="less" type="text/less">
    .canvas-wrapper {
        list-style: none;
    }

    .oldCanvas {
        position: absolute;
        top: -9999px;
        right: -9999px;
        opacity: 0;
        pointer-events: none;
    }
</style>
