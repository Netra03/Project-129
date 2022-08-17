song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
    
}


function setup() {
    canvas = createCanvas(600, 550);
    canvas.center();
   
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function modelLoaded() {
    console.log('PoseNet is loaded');
}

function gotPoses(results) {
    if(results.length > 0 ) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rigthWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
    }
}



function draw() {
    image(video, 0, 0, 600, 550);
    fill("green");
    stroke("black");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2 == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "playing";
        }
    }
}