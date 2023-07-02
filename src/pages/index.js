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



async function bubble() {
  const arrSpeed = document.getElementById('speed-slider');
  const delay = 101 - arrSpeed.value;

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
          ele[j].style.background = '#22A39F';
          ele[j+1].style.background = '#22A39F';
      }
      ele[ele.length-1-i].style.background = 'green';
  }
  ele[0].style.background = 'green';
}

function disableBtns(){
  document.querySelector('#bubble').disabled=true;
  document.querySelector('#insertion').disabled=true;
  document.querySelector('#quick').disabled=true;
  document.querySelector('#merge').disabled=true;
  document.querySelector('#selection').disabled=true;
  document.querySelector('#speed-slider').disabled=true;
  document.querySelector('#slider').disabled=true;
  document.querySelector('.new-array-btn').disabled=true;
}

function enableBtns(){
  document.querySelector('#bubble').disabled=false;
  document.querySelector('#insertion').disabled=false;
  document.querySelector('#quick').disabled=false;
  document.querySelector('#merge').disabled=false;
  document.querySelector('#selection').disabled=false;
  document.querySelector('#speed-slider').disabled=false;
  document.querySelector('#slider').disabled=false;
  document.querySelector('.new-array-btn').disabled=false;
}

async function startBubble(){
  disableBtns();
  await bubble();
  enableBtns();
}

async function insertion(){
  const arrSpeed = document.getElementById('speed-slider');
  const delay = 101 - arrSpeed.value;

  console.log('In insertion()');
  const ele = document.querySelectorAll(".array-bar");
  // color
  ele[0].style.background = 'green';
  for(let i = 1; i < ele.length; i++){
      console.log('In ith loop');
      let j = i - 1;
      let key = ele[i].style.height;
      // color
      ele[i].style.background = 'blue';

      await waitforme(delay);

      while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
          console.log('In while loop');
          // color
          ele[j].style.background = 'blue';
          ele[j + 1].style.height = ele[j].style.height;
          j--;

          await waitforme(delay);

          // color
          for(let k = i; k >= 0; k--){
              ele[k].style.background = 'green';
          }
      }
      ele[j + 1].style.height = key;
      // color
      ele[i].style.background = 'green';
  }
}

async function startInsertion(){
  disableBtns();
  await insertion();
  enableBtns();
}


export default function Home() {
  const [array, setArray] = useState([]);
  const PRIMARY_COLOR = '#22A39F';
  
  const resetArray=()=>{
    const newarray = [];
    const arrSize=document.getElementById('slider');
    for (let i = 0; i < arrSize.value; i++) {
      newarray.push(randomIntFromInterval(15, 500));
    }
    setArray(newarray);

    const ele = document.querySelectorAll(".array-bar");
    for(let i = 0; i < ele.length; i++){
      ele[i].style.background = '#22A39F';
  }

   }
   const handleSizeChange = (event) => {
    const newSize = event.target.value;
    const newarray = [];
    for (let i = 0; i < newSize; i++) {
      newarray.push(randomIntFromInterval(15, 500));
    }
    setArray(newarray);
  };
   

  return (
    <>
     <div className="main-page">
     <div className="navbar-container">
        <button className="new-array-btn"  onClick={resetArray}>
            New Array
        </button>
        <div className="sorting-btns">
            <button id='bubble' disabled={array.length==0 ? true : false} className='sort-btn' onClick={startBubble}>
            Bubble Sort
            </button>
            <button id='insertion' disabled={array.length==0 ? true : false} className='sort-btn' onClick={startInsertion}>
            Insertion Sort
            </button>
            <button id='quick' disabled={array.length==0 ? true : false} className='sort-btn'>
            Quick Sort
            </button>
            <button id='merge' disabled={array.length==0 ? true : false} className='sort-btn'>
            Merge Sort
            </button>
            <button id='selection' disabled={array.length==0 ? true : false} className='sort-btn'>
            Selection Sort
            </button>
        </div>

        <div className="slider-controls">
            <div>
                <h1>Speed</h1>
                <input disabled={array.length==0 ? true : false} id='speed-slider' type="range" min={1} max={100} className="range-style"></input>
            </div>
            <div>
                <h1>Size</h1>
                <input disabled={array.length==0 ? true : false} onChange={handleSizeChange} type="range" min={10} max={150} id='slider' className="range-style"></input>
            </div>
        </div>
    </div>
     <div className="main-heading">
     <h1>Sorting Visualizer</h1>
     <div className="sorting-bars">
     {array.length===0 ? (
      <h1>Click the button to generate an array!!</h1>
     ):(
      <div className="sorting-bars">
        {array.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value}px`,backgroundColor: PRIMARY_COLOR }}
            ></div>
          ))}
      </div>
     )}
     </div>
     </div>
     </div>
    </>
  )
}