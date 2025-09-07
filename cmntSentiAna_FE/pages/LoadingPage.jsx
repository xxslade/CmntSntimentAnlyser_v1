import React from 'react';

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium text-gray-700">Analyzing comments, please wait...</p>
    </div>
  );
};

export default LoadingPage;
