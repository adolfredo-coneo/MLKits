const outputs = [];

// Euclidean distance
function distance(pointA, pointB) {
  return _.chain(pointA)
    .zip(pointB)
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;
}

function knn(data, point, k) {
  const result = data
    .map(row => [distance(row.slice(0, row.length - 1), point), row[row.length - 1]])
    .sort((a, b) => a[0] - b[0])
    .slice(0, k)
    .map(row => row[1])
    .reduce((acc, label) => {
      if (acc[label]) {
        acc[label]++;
      } else {
        acc[label] = 1;
      }
      return acc;
    }, {});
    //convert object to array
    const array = Object.entries(result);
    //sort array
    array.sort((a, b) => b[1] - a[1]);
    //return the most common label
    return parseInt(array[0][0]);

}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);
  return [testSet, trainingSet];
}

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  //Classification, what bucket the ball will fall into. K-Nearest Neighbors knn
  console.log('running analysis', outputs);
  const [testSet, trainingSet] = splitDataset(outputs, 100);

  _.range(1, 20).forEach(k => {
    let numberCorrect = 0;
    testSet.forEach((testPoint, i) => {
      const initialPoint = testPoint.slice(0, testPoint.length - 1);
      const bucket = knn(trainingSet, initialPoint, k);
      if (bucket === testPoint[3]) {
        numberCorrect++;
      }
      //console.log(bucket, testPoint[3]);
    });
    console.log('Accuracy: k:', k, numberCorrect / testSet.length);
  });
}

