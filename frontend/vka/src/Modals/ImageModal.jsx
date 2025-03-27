import React from 'react';

export default function ImageModal({ show, onClose, image }) {
  if (!show) {
    return null;
  }

  const handleClickOutside = (event) => {
    if (event.target.id === 'default-modal') {
      onClose();
    }
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden={!show}
        className={`fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${show ? '' : 'hidden'}`}
        onClick={handleClickOutside}
      >
        <div className="relative w-full max-w-3xl max-h-full p-4">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="flex justify-center items-center p-4 md:p-5 border-gray-200 dark:border-gray-600 max-h-full">
              <img 
                src={image} 
                alt="Modal content" 
                className="max-h-full max-w-full object-contain" 
                style={{ maxHeight: 'calc(100vh - 5rem)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
