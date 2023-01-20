function getRandomAnswer(answerList) {
    const shuffleList = [];
  
    while (shuffleList.length < 4) {
      let index = Math.floor(Math.random() * answerList.length);
      shuffleList.push(answerList[index]);
      answerList.splice(index, 1);
    }
  
    return shuffleList;
  }

  export default getRandomAnswer;