function sortWithThrowList(throwList) {
  let message = ""
  let count = 0;
  let temp = throwList[throwList.length - 1];

  for (let i = throwList.length - 1; i >= 0; i--) {
    if (temp == throwList[i]) {
      count++;
    } else {
      break;
    }
  }

  //处理数量
  if (count < 3) {
    return null;
  } else {
    switch (count) {
      case 3:
        message = '3连！这是什么运气，似乎马上就要中大奖了！'
        break;
      case 4:
        message = '4连！不可思议，离大奖越来越近了！'
        break;
      case 5:
        message = '5连！这就是传说中的五杀吗，喷他kill！'
        break;
      case 6:
        message = '666，据说这个概率只有0.015625！'
        break;
      default:
        message = '你已经超神了，大奖已经到手，出门买个彩票吧！'
    }

  }
  return message;
}

module.exports = {
  sortWithThrowList: sortWithThrowList,
}