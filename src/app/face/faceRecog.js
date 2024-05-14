"use client";
import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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
                    recognizeFaces();
                })
                .catch(err => console.error(err));
        };

        const recognizeFaces = async () => {
            const labeledDescriptors = await loadLabeledImages();
            console.log(labeledDescriptors);
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);

            videoRef.current.addEventListener('play', async () => {
                console.log('Playing');
                setInterval(async () => {
                    try {
                        // Check if the video element has valid dimensions
                        if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
                            const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };

                            const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
                            const resizedDetections = faceapi.resizeResults(detections, displaySize);

                            canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                            faceapi.matchDimensions(canvasRef.current, displaySize);

                            resizedDetections.forEach((detection) => {
                                const { box } = detection.detection;
                                const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' });
                                drawBox.draw(canvasRef.current);

                                // Log the label of the detected face
                                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                                console.log('Detected face:', bestMatch.label);
                            });
                        }
                    } catch (error) {
                        console.error('Error detecting faces:', error);
                    }
                }, 20);
            });
        };


        const loadLabeledImages = async () => {
            const labels = ['ZiXiang', 'SimYi']; // for WebCam
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