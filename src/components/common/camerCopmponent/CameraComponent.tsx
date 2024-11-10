import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Settings from "./../../masarat/userSideBar/settings/settings";

async function sendCapturedImage({ base64String, token }: any) {
  const cleanBase64 = base64String.replace("data:image/png;base64,", "");
  const body = {
    frame: cleanBase64,
    subject_id: "5ae529bd-2a81-4011-804c-e13d72192fb9",
    lesson_id: "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
  };
  const response = await axios.post<any>(
    "http://127.0.0.1:8000/questions/track-concentration/",
    body,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    }
  );
  console.log(response);
  return response.data;
}

const VideoCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.oncanplay = () => {
            setIsVideoReady(true);
          };
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        // Stop recording if there's an error (e.g., permission denied)
        setIsVideoReady(false);
        stopRecording();
      }
    };

    startWebcam();

    return () => {
      stopRecording();
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const captureImage = () => {
    if (isVideoReady && canvasRef.current && videoRef.current) {
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
      return canvasRef.current.toDataURL("image/png");
    }
    return null;
  };

  const startRecording = () => {
    setIsRecording(true);
    const id = setInterval(() => {
      const capturedImage = captureImage();
      if (capturedImage && token) {
        sendCapturedImage({ base64String: capturedImage, token });
      }
    }, 10000); // Capture every 10 seconds
    setIntervalId(id);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (isVideoReady) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isVideoReady]);

  return (
    <div className='overflow-hidden'>
      <video
        className='absolute inset-0 invisible'
        ref={videoRef}
        width='1'
        height='1'
        autoPlay
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default VideoCapture;
