<script>
	import paper from 'paper'
	import {wireArrayA,wireArrayB} from './consts/wires'
  let startLocation = [200,200];

function drawBoard() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('board');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// Create a Paper.js Path to draw a line into it:
  var pathA = new paper.Path();
  pathA.strokeColor = 'black';
  var pathB = new paper.Path();
  pathB.strokeColor = 'red';

  drawPath(wireArrayA,pathA,startLocation);

  drawPath(wireArrayB, pathB,startLocation);

  paper.view.draw();
  return shortestDistanceToIntersection(pathA, pathB, startLocation);
  // Draw the view now:
}
function finstShortestElectricityDistance() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('board');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// Create a Paper.js Path to draw a line into it:
  var pathA = new paper.Path();
  pathA.strokeColor = 'black';
  drawPath(wireArrayA,pathA,startLocation);

  var pathB = new paper.Path();
  pathB.strokeColor = 'red';
  drawPath(wireArrayB, pathB,startLocation);

  paper.view.draw();
  return getLengthToPoints(pathA,pathB);
  // Draw the view now:
}

function drawPath(movementArray, path, startLocation) {
	let currentPoint = new paper.Point(startLocation[0], startLocation[1]);
	path.moveTo(currentPoint);
	movementArray.forEach(element=>{
		currentPoint = currentPoint.add(element);
		path.lineTo(currentPoint);
	})
}

function shortestDistanceToIntersection(path1, path2, startLocation) {
    const intersections = path1.getIntersections(path2);
    console.log(intersections);
    let distance;
    let lowestDistance = Infinity;
    for (var i = 0; i < intersections.length; i++) {
        distance = Math.abs(intersections[i].point.x - startLocation[0])+ Math.abs(intersections[i].point.y - startLocation[1]);
        lowestDistance = distance > 0 && distance < lowestDistance ? distance : lowestDistance;
        new paper.Path.Circle({
            center: intersections[i].point,
            radius: 3,
            fillColor: '#009dec'
        });
    }
  return lowestDistance;
}

function getLengthToPoints(path1, path2, startLocation) {
    const intersectionsA = path1.getIntersections(path2);
    const intersectionsB = path2.getIntersections(path1);
    let distance;
    let lowestDistance = Infinity;
    let pointFound = {x:Infinity,y:Infinity}
    for (var a = 1; a < intersectionsA.length; a++) {
      for (var b = 1; b < intersectionsA.length; b++) {
        if(intersectionsA[a].point.x === intersectionsB[b].point.x && intersectionsA[a].point.y === intersectionsB[b].point.y) {
          distance = intersectionsA[a].offset + intersectionsB[b].offset;
          if(distance > 0 && distance < lowestDistance){
            lowestDistance = distance > 0 && distance < lowestDistance ? distance : lowestDistance;
            pointFound = {x: intersectionsA[a].point.x, y: intersectionsA[a].point.y};
          }
        }
      }
  }
    return lowestDistance;
}
// function drawStepByStep() {

// 	// Get a reference to the canvas object
// 	var canvas = document.getElementById('board');
// 	// Create an empty project and a view for the canvas:
// 	paper.setup(canvas);
//   var pathA = new paper.Path();
//   pathA.strokeColor = 'black';
//   var pathB = new paper.Path();
//   pathB.strokeColor = 'red';
//   // Create a Paper.js Path to draw a line into it:
//   // let distance = 
//   // while
//   // drawPath(wireArrayA,pathA,startLocation);
//   // drawPath(wireArrayB, pathB,startLocation);

//   // paper.view.draw();
//   // Draw the view now:
	
// }

function getNumberOfIntersections(path1, path2) {
    return path1.getIntersections(path2).length;
}

</script>


<!-- <button on:click={drawBoard}>DRAW</button> -->
<p>The answer is: {drawBoard()}</p>
<p>The shortest distance on the lines is: {finstShortestElectricityDistance()}</p>

<canvas id="board" width="500" height="500"></canvas>
