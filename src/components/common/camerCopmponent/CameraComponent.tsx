import React, { useState, useRef, useEffect } from "react";

interface VideoCaptureProps {}

const VideoCapture: React.FC<VideoCaptureProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  // Request webcam access and start video stream
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear interval on component unmount
      }
    };
  }, [intervalId]);

  // Capture the image from the video
  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      context?.drawImage(
        video,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const image = canvasRef.current.toDataURL("image/png");
      setImageData(image); // Save the captured image
      console.log("Captured image:", image);
    }
  };

  // Start recording and capture image every minute
  const startRecording = () => {
    setIsRecording(true);
    const id = setInterval(captureImage, 10000); // Capture every 1 minute (60000ms)
    setIntervalId(id);
  };

  // Stop recording and clear interval
  const stopRecording = () => {
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          width='640'
          height='480'
          autoPlay
          muted
          style={{ border: "1px solid #000" }}
        />
      </div>
      <div>
        <button
          onClick={startRecording}
          disabled={isRecording}
          className='border-r-gray-950'
        >
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
      <div>
        {imageData && (
          <div>
            <h3>Captured Image:</h3>
            <img src={imageData} alt='Captured Screenshot' width='320' />
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default VideoCapture;
