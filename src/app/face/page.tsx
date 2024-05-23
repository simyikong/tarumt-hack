import React from 'react';
import Head from 'next/head';
import FaceRecognition from './faceRecog';

const FaceRecognitionPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Face Recognition Page</title>
                <meta name="description" content="Face Recognition Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Face Recognition Page</h1>
                <FaceRecognition />
            </main>

            <footer>
                <p>This is the footer.</p>
            </footer>
        </div>
    );
};

export default FaceRecognitionPage;

