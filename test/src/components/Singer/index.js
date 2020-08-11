let dealWithData = function (data) {
  let result = [];
  let result1 = [];
  let obj = {
    hot: []
  };
  for (var i = 0; i < data.length; i++) {
    let item = data[i];
    // console.log(item)
    item.picUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
    if (i < 10) {
      obj["hot"].push(item);
    }

    if (!obj[item.Findex]) {
      obj[item.Findex] = [item];
    } else {
      obj[item.Findex].push(item);
    }
  }
  for (const key in obj) {
    if (key != 9) {
      if (key != "hot") {
        result1.push({
          Findex: key,
          list: obj[key]
        });
      } else {
        result.push({
          Findex: key,
          list: obj[key]
        });
      }
    }
  }
  let rank = result1.sort((a, b) => {
    return a.Findex.charCodeAt() - b.Findex.charCodeAt();
  });
  let singersData = result.concat(result1);
  //   console.log(singersData);
  return singersData
}
export {
  dealWithData
}
