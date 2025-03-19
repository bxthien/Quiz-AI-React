import React from "react";

const Success = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-blue-500 p-4 rounded-lg shadow-lg w-96 text-center">
        <div className="bg-blue-300 p-2 rounded-lg flex flex-col items-center py-20">
          <img src="/success.svg" alt="Success" className="w-16 h-16 mb-2" />
          <h2 className="text-lg font-bold text-white">Save Successful</h2>
        </div>
      </div>
    </div>
  );
};

export default Success;
