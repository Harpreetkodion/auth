"use client";
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import Navbar from '../component/navbar';

const BarcodeScanner = () => {

    const webcamRef = useRef(null);
    const router = useRouter();
    const [data, setData] = useState('No result');
    const [isScanning, setIsScanning] = useState(false);
    const [manualBarcode, setManualBarcode] = useState('');

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();

            // Ensure that the image is valid before processing
            if (imageSrc) {
                const image = new Image();
                image.src = imageSrc;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, image.width, image.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                    // Use jsQR to decode the QR code
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        setData(code.data); // Set the scanned barcode data
                        setIsScanning(false); // Stop scanning
                    }
                };
            }
        }
    }, [webcamRef]);

    useEffect(() => {
        let interval;

        if (isScanning) {
            interval = setInterval(() => {
                capture();
            }, 500); // Scan every 500ms
        }

        return () => clearInterval(interval);
    }, [isScanning, capture]);

    const toggleScanning = () => {
        if (isScanning) {
            setIsScanning(false);
        } else {
            setData('');
            setIsScanning(true);
        }
    };

    const handleManualInput = (e) => {
        setManualBarcode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData(manualBarcode);

        try {
            const res = await fetch('/api/auth/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    upc: manualBarcode
                }),
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log('data:', data);
                router.push(`/scanDetailPage?scanData=${encodeURIComponent(JSON.stringify(data))}`);
            } else {
                console.log('Error:', res.status);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
        setManualBarcode('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <Navbar />
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-2xl">
                <h2 className="text-4xl font-extrabold text-center text-gray-800">Barcode Scanner</h2>
                <p className="text-center text-gray-500">Scan a barcode to get started</p>

                {isScanning ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={400}
                        height={400}
                    />
                ) : (
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                value={manualBarcode}
                                onChange={handleManualInput}
                                className="w-full px-5 py-3 mt-1 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                                placeholder="Enter barcode manually"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full px-5 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit Barcode
                            </button>
                        </form>
                    </div>
                )}

                <div className="text-center text-gray-800 mt-4">
                    <p className="mb-4">Scanned Data:</p>
                    <p className="font-bold text-xl">{data}</p> {/* Display scanned data */}
                </div>

                <button
                    onClick={toggleScanning}
                    className={`mt-4 px-5 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isScanning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                >
                    {isScanning ? 'Stop Scanning' : 'Scan with Camera'}
                </button>
            </div>
        </div>
    );
};

export default BarcodeScanner;