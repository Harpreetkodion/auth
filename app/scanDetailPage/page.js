/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../component/navbar';

const ScanHistoryDetail = () => {
    const searchParams = useSearchParams();
    const scanData = searchParams.get('scanData');
    const data = JSON.parse(scanData);
    console.log('data', data);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <Navbar />

            <div className="flex items-center justify-center pt-24 px-6">
                <div className="w-full max-w-4xl p-10 space-y-8 bg-white rounded-3xl shadow-2xl">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800">{data.title}</h2>
                    <p className="text-center text-gray-500">{data.desc}</p>

                    <div className="w-full space-y-6">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-200 rounded-lg text-lg">
                            <div className="col-span-6 font-bold text-gray-800">Details</div>
                            <div className="col-span-6 font-bold text-gray-800">Images</div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-6 bg-white rounded-lg shadow-md items-center">
                            <div className="col-span-6">
                                <p className="text-gray-700"><strong>Model:</strong> {data?.model}</p>
                                <p className="text-gray-700"><strong>Price:</strong> $ {data.prices ? data.prices : 0}</p>
                                <p className="text-gray-700"><strong>Identifier:</strong> {data?.identifier}</p>
                                <p className="text-gray-700"><strong>Quantity:</strong> {data?.quantity}</p>
                            </div>

                            {/* Images Section */}
                            <div className="col-span-6 flex flex-col items-center">
                                {data?.images?.length > 0 && (
                                    <>
                                        <img className="w-48 h-48 object-cover rounded-lg mb-2" src={data.images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
                                        <div className="flex space-x-2">
                                            {data.images.slice(0, 3).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleDotClick(index)}
                                                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-400'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanHistoryDetail;
