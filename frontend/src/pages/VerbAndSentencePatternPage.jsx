import React, { useState, useEffect } from "react";

const VerbAndSentencePatternPage = () => {
  const [problemNumber, setProblemNumber] = useState(1);
  const [problemData, setProblemData] = useState(null);
  const [currentEnglishChunkIndex, setCurrentEnglishChunkIndex] = useState(0);
  const [currentChineseChunkIndex, setCurrentChineseChunkIndex] = useState(0);
  const [displayedEnglish, setDisplayedEnglish] = useState([]);
  const [displayedChinese, setDisplayedChinese] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [wrongMessage, setWrongMessage] = useState(""); // State for the wrong message
  const [sentenceAnalysisIndex, setSentenceAnalysisIndex] = useState(0); // 0: subject, 1: verb, 2: object

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/problems/problem-number/${problemNumber}`
        );
        const data = await response.json();
        setProblemData(data);

        if (data.english_chunk1) {
          setDisplayedEnglish([data.english_chunk1]);
        }
      } catch (error) {
        console.error("Error fetching problem data:", error);
      }
    };

    fetchProblemData();
  }, [problemNumber]);

  const handleNextEnglish = () => {
    if (!problemData) return;

    const englishChunks = [
      problemData.english_subject,
      problemData.english_chunk2,
      problemData.english_verb,
      problemData.english_chunk3,
      problemData.english_object,
      problemData.english_chunk4,
    ];

    let nextIndex = currentEnglishChunkIndex;
    while (nextIndex < englishChunks.length && !englishChunks[nextIndex]) {
      nextIndex++;
      setCurrentEnglishChunkIndex(nextIndex);
    }

    if (nextIndex < englishChunks.length) {
      setDisplayedEnglish((prev) => [...prev, englishChunks[nextIndex]]);
      setCurrentEnglishChunkIndex(nextIndex + 1);
    }

    if (englishChunks[nextIndex] === problemData.english_verb) {
      shuffleAnswers();
    }
  };

  const handleNextChinese = () => {
    if (!problemData || (currentChineseChunkIndex === 2 && !answerSubmitted)) return;

    const chineseChunks = [
      problemData.chinese_chunk1,
      problemData.chinese_subject,
      problemData.chinese_chunk2,
      problemData.chinese_verb,
      problemData.chinese_chunk3,
      problemData.chinese_object,
      problemData.chinese_chunk4,
    ];

    let nextIndex = currentChineseChunkIndex;
    while (nextIndex < chineseChunks.length && !chineseChunks[nextIndex]) {
      nextIndex++;
    }

    if (nextIndex < chineseChunks.length && nextIndex <= currentEnglishChunkIndex) {
      setDisplayedChinese((prev) => [...prev, chineseChunks[nextIndex]]);
      setCurrentChineseChunkIndex(nextIndex + 1);
    }
  };

  const shuffleAnswers = () => {
    const answers = [
      { text: problemData.correct_answer, isCorrect: true },
      { text: problemData.wrong_answer, isCorrect: false },
    ];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
  };

  const handleNextQuestion = () => {
    if(!problemData || !answerSubmitted || currentEnglishChunkIndex < 5) return;

    setProblemNumber((prev) => prev + 1);
    setCurrentEnglishChunkIndex(0);
    setCurrentChineseChunkIndex(0);
    setDisplayedEnglish([problemData.english_chunk1]);
    setDisplayedChinese([]);
    setAnswerSubmitted(false);
    setShuffledAnswers([]);
  };

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      // Handle correct answer logic
      setAnswerSubmitted(true);
      setWrongMessage(""); // Clear the wrong message if the answer is correct
    } else {
      setWrongMessage("Oops! That's not correct. Please try again."); // Set the wrong message
    }
  };

  const handleSentenceAnalysis = () => {
    if (!problemData) return;
  
    const updatedChunks = [...displayedEnglish];
    const target = [
      { key: "english_subject", color: "bg-green-200", label: "subject" },
      { key: "english_verb", color: "bg-yellow-200", label: "verb" },
      { key: "english_object", color: "bg-orange-200", label: "object" },
    ];
  
    const { key, color, label } = target[sentenceAnalysisIndex];
  
    // Check if the target chunk is displayed
    const targetIndex = updatedChunks.findIndex(
      (chunk) => chunk === problemData[key]
    );
  
    if (targetIndex !== -1) {
      // Modify the chunk to include a background and add a label
      updatedChunks[targetIndex] = {
        text: updatedChunks[targetIndex],
        style: color,
        label: label,
      };
  
      // Update the state
      setDisplayedEnglish(updatedChunks);
      setSentenceAnalysisIndex((prevIndex) => prevIndex + 1); // Move to the next step
    }
  };
  

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center">
      <div className="w-4/5 bg-gray-100 shadow-lg p-6 rounded-lg">
        <div className="flex flex-col items-start space-y-6">
            {/* English Sentence */}
            <div className="flex flex-col items-start w-full px-4">
                <h2 className="text-lg font-bold mb-2">English Sentence</h2>
                <div className="flex flex-wrap gap-2 text-gray-700 text-lg">
                    {displayedEnglish.map((chunk, index) =>
                    typeof chunk === "string" ? (
                        <span key={index}>{chunk}</span>
                    ) : (
                        <div key={index} className="flex flex-col items-center">
                            <span className={`${chunk.style} px-1 rounded`}>{chunk.text}</span>
                            <span className="text-xs text-gray-500">{chunk.label}</span>
                        </div>
                    )
                    )}
                </div>
                <div className="flex space-x-2 mt-4 ml-auto">
                    <button
                        onClick={handleNextEnglish}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded flex items-center"
                    >
                        <span className="mr-2">Next</span>
                        <span className="text-xl">&#x25B6;</span>
                    </button>
                    <button
                        onClick={() => handleSentenceAnalysis()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded flex items-center"
                    >
                        Sentence Analysis
                    </button>
                </div>
            </div>


            {/* Chinese Sentence */}
            <div className="flex flex-col items-start w-full px-4">
                <h2 className="text-lg font-bold mb-2">Chinese Sentence</h2>
                <div className="flex flex-wrap gap-2 text-gray-700 text-lg">
                    {displayedChinese.map((chunk, index) => (
                    <span
                        key={index}
                        className={chunk.role ? "bg-yellow-200 px-1 rounded" : ""}
                        title={chunk.role || ""}
                    >
                        {chunk.text || chunk}
                    </span>
                    ))}
                </div>
                <div className="flex space-x-2 mt-4 ml-auto">
                    <button
                        onClick={handleNextChinese}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded flex items-center"
                    >
                        <span className="mr-2">Next</span>
                        <span className="text-xl">&#x25B6;</span>
                    </button>
                </div>
            </div>


            {/* Answer Section */}
            {displayedEnglish.includes(problemData?.english_verb) && !answerSubmitted && (
                <div className="flex flex-col items-center w-full mt-6">
                    {/* Wrong message display */}
                    {wrongMessage && (
                        <div className="mb-4 text-red-500 font-semibold">
                            {wrongMessage}
                        </div>
                    )}
                    <h3 className="text-md font-semibold mb-4">Choose the correct answer:</h3>
                    <div className="flex space-x-4">
                        {shuffledAnswers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(answer.isCorrect)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
                        >
                            {answer.text}
                        </button>
                        ))}
                    </div>
                </div>
            )}

          {/* Next Question Button */}
          {answerSubmitted && (
            <div className="flex justify-center w-full">
              <button
                onClick={handleNextQuestion}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbAndSentencePatternPage;
