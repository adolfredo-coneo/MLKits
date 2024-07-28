const outputs = [];
const predictionPoint = 300;
const k = 3;

// Euclidean distance
function distance(point) {
  return Math.abs(point - predictionPoint);
}

function knn(data) {
  const result = data
    .map(row => [distance(row[0]), row[3]])
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

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  //Classification, what bucket the ball will fall into. K-Nearest Neighbors knn
  console.log('running analysis', outputs);
  const bucket = knn(outputs);
  console.log(bucket);
}

