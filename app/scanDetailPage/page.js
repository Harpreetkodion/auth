"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ScanDetail = () => {
    const searchParams = useSearchParams();
    const scanData = searchParams.get('scanData');
    const data = JSON.parse(scanData);
     
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <div className="w-full max-w-2xl p-10 space-y-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-900">{data.Title}</h2>
                <p className="text-center text-gray-600">{data.Desc}</p>

                <div className="flex flex-col lg:flex-row mt-6">
                    {/* Details Section */}
                    <div className="flex-1 p-4">
                        <h3 className="text-2xl font-semibold text-gray-800">Details</h3>
                        <p className="text-gray-700"><strong>Model:</strong> {data.Model}</p>
                        <p className="text-gray-700"><strong>Average Price:</strong> ${data.AveragePrice}</p>
                        <p className="text-gray-700"><strong>Identifier:</strong> {data.Identifier}</p>
                    </div>

                    {/* Images Section */}
                    <div className="flex-1 p-4">
                        <h3 className="text-2xl font-semibold text-gray-800">Images</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {data.Images.slice(0, 2).map((image, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                    <img src={image} alt={`Image ${index + 1}`} layout="responsive" width={400} height={400} className="object-cover transition-transform duration-300 hover:scale-105" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <div className="mt-8 text-center">
                    <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
                        Back to Home
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ScanDetail;
