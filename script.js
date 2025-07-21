let video;
let detector;
let detections = [];

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('canvasContainer');
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady() {
  console.log("Model is ready!");
  detect();
}

function detect() {
  detector.detect(video, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    detections = results;
    detect(); // Run again
  });
}

function draw() {
  image(video, 0, 0);
  detections.forEach(d => {
    noFill();
    stroke(0, 255, 0);
    rect(d.x, d.y, d.width, d.height);
    noStroke();
    fill(255);
    text(d.label, d.x + 10, d.y + 10);
  });
}
