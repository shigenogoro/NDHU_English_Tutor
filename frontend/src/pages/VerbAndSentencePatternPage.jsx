import React from "react";

const VerbAndSentencePatternPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center">
      <div className="w-4/5 bg-gray-100 shadow-lg p-6 rounded-lg">
        <div className="flex flex-col items-start space-y-6">
          {/* Chinese Translation */}
          <div className="flex flex-col items-center w-full px-4">
            <h2 className="text-lg font-bold mb-2">Chinese Translation</h2>
            <p className="text-gray-700">這是中文翻譯的例句</p>
            <button
              className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded flex items-center"
            >
              <span className="mr-2">Next</span>
              <span className="text-xl">&#x25B6;</span>
            </button>
          </div>

          {/* English Sentence */}
          <div className="flex flex-col items-center w-full px-4">
            <h2 className="text-lg font-bold mb-2">English Sentence</h2>
            <p className="text-gray-700">This is an example sentence in English.</p>
            <button
              className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded flex items-center"
            >
              <span className="mr-2">Next</span>
              <span className="text-xl">&#x25B6;</span>
            </button>
          </div>

          {/* Sentence Analysis */}
          <div className="flex flex-col items-center w-full px-4">
            <h2 className="text-lg font-bold mb-2">Sentence Analysis</h2>
            <p className="text-gray-700">This is an analysis of the sentence structure.</p>
            <button
              className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded flex items-center"
            >
              <span className="mr-2">Next</span>
              <span className="text-xl">&#x25B6;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbAndSentencePatternPage;
