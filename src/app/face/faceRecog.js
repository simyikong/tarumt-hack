"use client";
import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
    const videoRef = useRef(null);

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
                const canvas = faceapi.createCanvasFromMedia(videoRef.current);
                document.body.append(canvas);

                const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
                faceapi.matchDimensions(canvas, displaySize);

                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                    const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
                    results.forEach((result, i) => {
                        const box = resizedDetections[i].detection.box;
                        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
                        drawBox.draw(canvas);
                    });
                }, 100);
            });
        };

        const loadLabeledImages = async () => {
            const labels = ['Prashant Kumar']; // for WebCam
            return Promise.all(
                labels.map(async (label) => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) {
                        const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`);
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
        <div>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ display: 'none' }} // Hide video element
            />
        </div>
    );
};

export default FaceRecognition;
