"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [detections, setDetections] = useState([]);

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
            ]);
            start();
        };

        const start = () => {
            console.log('Models Loaded');
            navigator.mediaDevices.getUserMedia({ video: {} })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play(); // Auto play video
                    recognizeFaces(); // Start recognizing faces immediately
                })
                .catch(err => console.error(err));
        };
        
        const recognizeFaces = async () => {
            const labeledDescriptors = await loadLabeledImages();
            console.log(labeledDescriptors);
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
            console.log("SIMILAR: "+ faceMatcher.findBestMatch);
            console.log("SIMILAR: "+ faceMatcher.labeledDescriptors);
            console.log("SIMILAR: "+ faceMatcher.matchDescriptor);

            videoRef.current.addEventListener('play', async () => {
                console.log('Playing');
                const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
                faceapi.matchDimensions(canvasRef.current, displaySize);

                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    setDetections(resizedDetections);

                    canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                    resizedDetections.forEach((detection) => {
                        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                        console.log("FOUND : " + bestMatch.label);
                        const box = detection.detection.box;
                        const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
                        drawBox.draw(canvasRef.current);
                    });
                }, 100);
            });          
        };
        

        const loadLabeledImages = async () => {
            const labels = ['SimYi']; // for WebCam
            return Promise.all(
                labels.map(async (label) => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) {
                        let img;
                        try {
                            // Try fetching with .jpg extension
                            img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`);
                        } catch (error) {
                            try {
                                // If fetching with .jpg fails, try fetching with .jpeg extension
                                img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpeg`);
                            } catch (error) {
                                // Handle error if fetching both extensions fails
                                console.error(`Failed to fetch image for ${label} (${i}.jpg or ${i}.jpeg)`);
                                continue; // Skip to the next image
                            }
                        }
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                        console.log(label + i + JSON.stringify(detections));
                        descriptions.push(detections.descriptor);
                    }
                    document.body.append(label + ' Faces Loaded | ');
                    return new faceapi.LabeledFaceDescriptors(label, descriptions);
                })
            );
        };
        loadModels();

        // Clean up function
        return () => {
            // Stop video stream and remove event listeners
            if (videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '50%', height: '50%' }} // Set video dimensions
            />
            <canvas 
                ref={canvasRef} 
                style={{ position: 'absolute', top: 30, left: 400 }} 
            />
        </div>
    );
};

export default FaceRecognition;

