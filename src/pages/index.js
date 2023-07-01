import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  
}

function swap(el1, el2) {
  console.log('In swap()');
  
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
  
}

function waitforme(milisec) { 
  return new Promise(resolve => { 
      setTimeout(() => { resolve('') }, milisec); 
  }) 
}

let delay = 1;

async function bubble() {
  console.log('In bubble()');
  const ele = document.querySelectorAll(".array-bar");
  for(let i = 0; i < ele.length-1; i++){
      console.log('In ith loop');
      for(let j = 0; j < ele.length-i-1; j++){
          console.log('In jth loop');
          ele[j].style.background = 'blue';
          ele[j+1].style.background = 'blue';
          if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
              console.log('In if condition');
              await waitforme(delay);
              swap(ele[j], ele[j+1]);
          }
          ele[j].style.background = 'turquoise';
          ele[j+1].style.background = 'turquoise';
      }
      ele[ele.length-1-i].style.background = 'green';
  }
  ele[0].style.background = 'green';
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

    const ele = document.querySelectorAll(".array-bar");
    for(let i = 0; i < ele.length; i++){
      ele[i].style.background = 'turquoise';
  }

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
            <span className="button_top" onClick={bubble}>Bubble Sort
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