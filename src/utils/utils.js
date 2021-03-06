// loading
export function OpenLoading(val, type,delay = 15000) { // type=1：普通请求； type=2：抛转请求
  const loading = val.$loading({
    lock: true,
    text: "加载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.2)",
  });
  val.overloading = setTimeout(function () { // 设定定时器，超时15S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close(); // 关闭遮罩层
    if (type == 1) {
      val.$message.warning('网络问题，请稍候重试！');
    } else if (type == 2) {
      val.$message.warning('网络问题，请稍候刷新页面重试！');
    }
  }, delay)
  return loading;
}
export function h5OpenLoading(val,delay = 15000) {
  const loading = val.$loading({
    lock: true,
    text: "加载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.2)",
  });
  val.overloading = setTimeout(function () { // 设定定时器，超时15S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close(); // 关闭遮罩层
    val.$toast({
      type: "fail",
      message: "网络问题，请稍候刷新页面重试！",
    });
  }, delay)
  return loading;
}

// 格式化日期
export function dateFmt(value) {
  if (null != value && "" != value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    return y + '/' + m + '/' + d;
  } else {
    return "";
  }
}

// 格式化时间
export function timeFmt() {
  function zeroFill(i) {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    } else {
      return i;
    }
  }
  var date = new Date(); //当前时间
  var month = zeroFill(date.getMonth() + 1); //月
  var day = zeroFill(date.getDate()); //日
  var hour = zeroFill(date.getHours()); //时
  var minute = zeroFill(date.getMinutes()); //分
  var second = zeroFill(date.getSeconds()); //秒
  //当前时间
  var curTime = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  return curTime;
}

// 对象数据置空
export function reset(obj) {
  Object.keys(obj).forEach(key => {
    switch (typeof obj[key]) {
      case 'string':
        obj[key] = '';
        break;
      case 'number':
        obj[key] = 0;
        break;
      case 'object':
        if (obj[key] instanceof Array) {
          obj[key] = []
        } else if (obj[key] instanceof Date) {
          obj[key] = ""
        } else {
          reset(obj[key]);
        }
        break;
      case 'boolean':
        obj[key] = true;
        break;
      default:
        obj[key] = ''
        break;
    }
  })
}
export function number_chinese(str) {
  var num = parseFloat(str);
  var strOutput = "",
    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += "00";
  var intPos = num.indexOf('.');
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i = 0; i < num.length; i++) {
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  }
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

}

// 保留小数点后  // num为传入的值，n为保留的小数位
export function fomatFloat(num, n) {
  var f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂   
  var s = f.toString();
  var rs = s.indexOf('.');
  //判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + n) {
    s += '0';
  }
  return s;
}

export function format(obj, head) {
  let res = []; //返回结果
  let rows = 6; //每一行的数量
  if (obj.length == 0) {
    return
  } else {
    let lines = Math.ceil(head.length / rows); //每一行rows个，计算一共需要多少行
    for (let i = 0; i < lines; i++) {
      let tempItem = {}
      let tempData = []
      let tempHead = head.slice(i * rows, (i + 1) * rows)
      obj.forEach(item => {
        let temp = {}
        tempHead.forEach(ele => {
          temp[ele] = item[ele]
        })
        tempData.push(temp)
      })
      tempItem.tHead = tempHead
      tempItem.tData = tempData
      res.push(tempItem)
    }
  }
  return res
}

export function getFilterTplid(type){
  let env = process.env.NODE_ENV
  let orgid = sessionStorage.getItem('OrgId') ? JSON.parse(sessionStorage.getItem('OrgId')) : 2
  console.log('utils:',env,orgid)
  let id_env = {
    BJ:{
      GDZCSQD:"8898",//固定资产申请单
      CCSQD:"8894",//出差申请单
      FKSQD:"8902"//付款申请单
    },//北京
    CD:{
      GDZCSQD:"8946",
      CCSQD:"8941",
      FKSQD:"8950",
    },//成都
    SH:{
      GDZCSQD:"8946",
      CCSQD:"8941",
      FKSQD:"8950",
    }//上海
  }
  let id_prod = {
    BJ:{
      GDZCSQD:"8910",//固定资产申请单
      CCSQD:"8906",//出差申请单
      FKSQD:"8914"//付款申请单
    },//北京
    CD:{
      GDZCSQD:"8952",
      CCSQD:"8948",
      FKSQD:"8956"
    },//成都
    SH:{
      GDZCSQD:"8924",
      CCSQD:"8920",
      FKSQD:"8928"
    }//上海
  }
  if(env == 'development' ){
    // return id_env[type]
    switch (orgid) {
      case 1:
        return id_env.BJ[type]
      case 2:
        return id_env.CD[type]
      case 3:
        return id_env.SH[type]
      default:
        break;
    }
  }else{
    switch (orgid) {
      case 1:
        return id_prod.BJ[type]
      case 2:
        return id_prod.CD[type]
      case 3:
        return id_prod.SH[type]
      default:
        break;
    }
  }
}

export function getUrlParams(href) {
  if (href.indexOf("?") == -1) {
      return {};
  }
  href = decodeURIComponent(href);
  var queryString = href.substring(href.indexOf("?") + 1);
  var parameters = queryString.split("&");
  var all = {};
  var pos, paraName, paraValue;
  for (var i = 0; i < parameters.length; i++) {
      pos = parameters[i].indexOf('=');
      if (pos == -1) {
          continue;
      }
      paraName = parameters[i].substring(0, pos);
      paraValue = parameters[i].substring(pos + 1);
      all[paraName] = paraValue;
  }
  return all;
}