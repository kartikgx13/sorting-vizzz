import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  
}

export default function Home() {
  const [array, setArray] = useState([]);
  const PRIMARY_COLOR = 'turquoise';
  
  const resetArray=()=>{
    const newarray = [];
    for (let i = 0; i < 150; i++) {
      newarray.push(randomIntFromInterval(15, 750));
    }
    setArray(newarray);
   }
  return (
    <>
     <div className="main-page">
     <div className="navbar-container">
        <div className="new-array-btn"  onClick={resetArray}>
            New Array
        </div>
        <div className="sorting-btns">
            <button>
            <span className="button_top">Bubble Sort
            </span>
            </button>
            <button>
            <span className="button_top">Insertion Sort
            </span>
            </button>
            <button>
            <span className="button_top">Quick Sort
            </span>
            </button>
            <button>
            <span className="button_top">Merge Sort
            </span>
            </button>
            <button>
            <span className="button_top">Selection Sort
            </span>
            </button>
        </div>

        <div className="slider-controls">
            <div>
                <h1>Speed</h1>
                <input type="range" className="range-style"></input>
            </div>
            <div>
                <h1>Size</h1>
                <input type="range" className="range-style"></input>
            </div>
        </div>
    </div>
     <div className="main-heading">
     <h1>Sorting Visualizer</h1>
     <div className="sorting-bars">
     {array.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value}px`,backgroundColor: PRIMARY_COLOR }}
            ></div>
          ))}
     </div>
     </div>
     </div>
    </>
  )
}