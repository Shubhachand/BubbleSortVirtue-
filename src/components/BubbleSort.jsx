// BubbleSort.jsx
import React, { useEffect, useState } from 'react';
import './BubbleSort.css';

const BubbleSort = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [sortingStats, setSortingStats] = useState({
    timeElapsed: 0,
    startTime: null
  });

  // Generate random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 20; i++) {
      newArray.push(Math.ceil(Math.random() * 100));
    }
    setArray(newArray);
    resetStats();
  };

  const resetStats = () => {
    setComparisons(0);
    setSwaps(0);
    setSortingStats({ timeElapsed: 0, startTime: null });
  };

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const swap = async (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setArray([...arr]);
    setSwaps(prev => prev + 1);
    await sleep(speed);
  };

  const bubbleSort = async () => {
    if (sorting) return;
    setSorting(true);
    setSortingStats({ timeElapsed: 0, startTime: Date.now() });
    
    let blocks = document.getElementsByClassName('block');
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Change color of blocks being compared
        blocks[j].style.backgroundColor = '#FF4949';
        blocks[j + 1].style.backgroundColor = '#FF4949';

        setComparisons(prev => prev + 1);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
        }

        // Revert color
        blocks[j].style.backgroundColor = '#6b5b95';
        blocks[j + 1].style.backgroundColor = '#6b5b95';
      }
      // Mark sorted element
      blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66';
    }
    
    setSorting(false);
    setSortingStats(prev => ({
      ...prev,
      timeElapsed: (Date.now() - prev.startTime) / 1000
    }));
  };

  const handleSpeedChange = (e) => {
    setSpeed(300 - e.target.value); // Inverse relationship for intuitive slider
  };

  return (
    <div className="container">
      <p className="header">Bubble Sort Visualizer</p>
      
      <div className="stats-container">
        <div className="stat-box">
          <p>Comparisons</p>
          <span>{comparisons}</span>
        </div>
        <div className="stat-box">
          <p>Swaps</p>
          <span>{swaps}</span>
        </div>
        <div className="stat-box">
          <p>Time</p>
          <span>{sortingStats.timeElapsed.toFixed(2)}s</span>
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={generateArray} 
          disabled={sorting}
          className="button"
        >
          Generate New Array
        </button>
        <button 
          onClick={bubbleSort} 
          disabled={sorting}
          className="button"
        >
          {sorting ? 'Sorting...' : 'Start Sorting'}
        </button>
        
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="0"
            max="290"
            value={300 - speed}
            onChange={handleSpeedChange}
            disabled={sorting}
          />
        </div>
      </div>

      <div id="array">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="block"
            style={{
              height: `${value * 3}px`,
              transform: `translateX(${idx * 30}px)`
            }}
          >
            <label className="block_id">{value}</label>
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="color-box" style={{backgroundColor: '#6b5b95'}}></div>
          <span>Unsorted</span>
        </div>
        <div className="legend-item">
          <div className="color-box" style={{backgroundColor: '#FF4949'}}></div>
          <span>Comparing</span>
        </div>
        <div className="legend-item">
          <div className="color-box" style={{backgroundColor: '#13CE66'}}></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default BubbleSort;