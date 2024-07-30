const outputs = [];
const k = 3;

// Euclidean distance
function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function knn(data, point) {
  const result = data
    .map(row => [distance(row[0], point), row[3]])
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
    return array[0][0];

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
  const [testSet, trainingSet] = splitDataset(outputs, 10);
  for (let i = 0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
    console.log(bucket, testSet[i][3]);
  }
}

