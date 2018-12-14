/**
 * 图片压缩，仅支持jpg,jpeg,png,webp格式
 * @param files 需要压缩的文件，必传
 * @param options 文件压缩程度（0-1），超过1为0.92，默认为0.85，非必传
 * @param type 文件压缩类型，非必传，默认为原格式，可选择固定格式，可选值为jpg,png,webp
 * @param format 返回文件格式，非必填，默认为input中file的格式，可选值为base64
 * */
const imageCompress = ({ files = {}, options = 0.85, type, format }) => {
  return new Promise(function(resolve, reject) {
    let returnFiles = [],
      message = [],
      filesNum = files.length,
      fileType;
    /**
     * 初始化
     * */
    const init = () => {
      //判断是否可以转换为对应格式
      if (
        !!type &&
        type !== "jpeg" &&
        type !== "jpg" &&
        type !== "webp" &&
        type !== "png"
      ) {
        reject({
          data: files,
          code: 0,
          message: `不能转换为${type}的图片格式，仅支持jpeg，jpg，png，webp格式的图片转换`
        });
        return false;
      }
      //判断是否可返回对应格式数据
      if (!!format && format !== "base64") {
        resolve({
          data: files,
          code: 0,
          message: `不支持输出${format}的文件格式`
        });
        return false;
      }

      if (isNaN(options)) {
        options = 0.85;
      }
      fileType = Object.prototype.toString.call(files).match(/[A-Z][a-z]*/)[0];
      if (fileType === "Array") {
        for (let i = 0, leg = files.length; i < leg; i++) {
          if (
            Object.prototype.toString.call(files[i]).match(/[A-Z][a-z]*/)[0] ===
            "File"
          ) {
            readerImg(files[i], i);
          } else {
            message.push([`第${i}个内容并不是文件内容`]);
            returnFilesChange(files[i]);
          }
        }
      } else if (fileType === "File") {
        readerImg(files);
      } else {
        resolve({ data: files, code: 0, message: "不是图片文件" });
      }
    };
    /**
     * returnFiles 修改，files为数组的时候
     * @param data
     * */
    const returnFilesChange = data => {
      returnFiles.push(data);
      if (filesNum <= 1) {
        resolve({
          data: returnFiles,
          code: 1,
          message: message.length <= 0 ? ["图片压缩成功"] : message
        });
      } else {
        filesNum--;
      }
    };
    /**
     * 读取图片内容
     * @param file 当前转换的原文件
     * @param i 当前为第几个文件
     * */
    const readerImg = (file, i) => {
      let imgType = file.type;
      if (
        imgType !== "image/jpeg" &&
        imgType !== "image/jpg" &&
        imgType !== "image/webp" &&
        imgType !== "image/png"
      ) {
        message.push([
          `第${i}个文件并不是支持的可压缩图片文件，仅支持jpeg，jpg，png，webp格式的图片转换`
        ]);
        returnFilesChange(files[i]);
        return false;
      }
      let initialImg;

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        initialImg = new Image();
        initialImg.src = reader.result;
        initialImg.onload = () => {
          drewCanvas(file, initialImg);
        };
      };
    };

    /**
     * 绘制图片
     * @param file 当前转换的原文件
     * @param initialImg 当前文件读取完成后的图片
     * */
    const drewCanvas = (file, initialImg) => {
      const id = "imageCompress_" + Math.floor(Math.random() * 100000);
      let canvasDom, canvasCtx, changeImg, returnImageType, isJpeg;
      let canvas = document.createElement("canvas");
      canvas.id = id;
      canvas.width = initialImg.width;
      canvas.height = initialImg.height;
      canvas.style.position = "absolute";
      canvas.style.top = `-${initialImg.height}px`;
      canvas.style.left = `-${initialImg.width}px`;
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";
      document.body.appendChild(canvas);

      canvasDom = document.getElementById(id);
      canvasCtx = canvasDom.getContext("2d");
      canvasCtx.clearRect(0, 0, initialImg.width, initialImg.height);
      canvasCtx.fillStyle = "#ffffff";
      canvasCtx.fill();

      canvasCtx.drawImage(initialImg, 0, 0);
      returnImageType = type ? `image/${type}` : file.type;

      changeImg = canvasDom.toDataURL(returnImageType, options);

      canvasDom.parentNode.removeChild(canvasDom);
      toReturn(changeImg, file);
    };

    /**
     * 将base64转换成file对象
     * @param changeImg base64内容
     * @param file 当前转换的原文件
     * */
    const toReturn = (changeImg, file) => {
      let imgName = file.name.replace(/\.[a-z]*$/, "");
      let arr = changeImg.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const newFile =
        format === "base64"
          ? changeImg
          : new File(
              [u8arr],
              `${imgName}.${suffix === "jpeg" ? "jpg" : suffix}`,
              { type: mime }
            );
      if (fileType === "Array") {
        if (newFile.size > file.size && newFile.type === file.type) {
          returnFilesChange(file);
        } else {
          returnFilesChange(newFile);
        }
      } else if (fileType === "File") {
        if (newFile.size > file.size && newFile.type === file.type) {
          resolve({
            data: file,
            code: 1,
            message: "图片压缩成功,但图片还原来"
          });
        } else {
          resolve({
            data: newFile,
            code: 1,
            message: "图片压缩成功"
          });
        }
      }
    };
    init();
  });
};

export default imageCompress;
