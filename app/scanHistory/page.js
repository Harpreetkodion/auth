/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';

export default function ScanHistoryDetail() {
    const [scanHistory, setScanHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScanHistory = async () => {
            try {
                const response = await fetch('/api/auth/scanHistoryDetail', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch scan history');
                }

                const data = await response.json();
                setScanHistory(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScanHistory();
    }, []);

    const truncateDescription = (desc, maxLength = 100) => {
        if (desc.length > maxLength) {
            return desc.slice(0, maxLength) + '...';
        }
        return desc;
    };

    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const handleDotClick = (scanId, index) => {
        setCurrentImageIndex((prev) => ({ ...prev, [scanId]: index })); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <Navbar />
            <div className="w-full max-w-6xl p-10 space-y-8 mt-20 bg-white rounded-3xl shadow-2xl">
                <h2 className="text-5xl font-extrabold text-center text-gray-800">Scan History</h2>
                <p className="text-center text-gray-500">Here are your past scan results</p>

                {loading ? (
                    <div className="text-center text-gray-800">Loading scan history...</div>
                ) : error ? (
                    <div className="text-center text-red-600">Error: {error}</div>
                ) : scanHistory.length === 0 ? (
                    <div className="text-center text-gray-800">No scan history available.</div>
                ) : (
                    <div className="w-full space-y-6">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-200 rounded-lg text-lg">
                            <div className="col-span-3 font-bold text-gray-800">Title</div>
                            <div className="col-span-4 font-bold text-gray-800">Description</div>
                            <div className="col-span-2 font-bold text-gray-800">Quantity</div>
                            <div className="col-span-2 font-bold text-gray-800">Identifier</div>
                            <div className="col-span-1 font-bold text-gray-800">Images</div>
                        </div>

                        <div className="space-y-4">
                            {scanHistory.map((scan) => {
                                const images = scan.images || [];
                                const currentIndex = currentImageIndex[scan._id] || 0;

                                return (
                                    <div key={scan._id} className="grid grid-cols-12 gap-4 p-6 bg-white rounded-lg shadow-md items-center" >
                                        <div className="col-span-3">
                                            <h3 className="text-xl font-semibold text-gray-800">{scan.title}</h3>
                                        </div>

                                        <div className="col-span-4">
                                            <p className="text-gray-600">
                                                {truncateDescription(scan.desc, 120)}
                                            </p>
                                        </div>

                                        <div className="col-span-2 pl-8">
                                            <p className="text-sm text-gray-500">{scan.quantity}</p>
                                        </div>

                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500">{scan.identifier}</p>
                                        </div>

                                        <div className="col-span-1 flex flex-col items-center">
                                            {images.length > 0 && (
                                                <>
                                                    <img
                                                        src={images[currentIndex]}
                                                        alt={scan.title}
                                                        className="w-16 h-16 object-cover rounded-lg mb-2"
                                                    />
                                                    {/* Dots Navigation */}
                                                    <div className="flex space-x-2">
                                                        {images.slice(0, 3).map((_, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => handleDotClick(scan._id, index)}
                                                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-400'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

