import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react';
import Image from 'next/image';

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



async function selection(){
  const arrSpeed = document.getElementById('speed-slider');
  const delay = 101 - arrSpeed.value;

  console.log('In selection()');
  const ele = document.querySelectorAll(".array-bar");
  for(let i = 0; i < ele.length; i++){
      console.log('In ith loop');
      let min_index = i;
      // Change color of the position to swap with the next min
      ele[i].style.background = 'blue';
      for(let j = i+1; j < ele.length; j++){
          console.log('In jth loop');
          // Change color for the current comparision (in consideration for min_index)
          ele[j].style.background = 'red';

          await waitforme(delay);
          if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
              console.log('In if condition height comparision');
              if(min_index !== i){
                  // new min_index is found so change prev min_index color back to normal
                  ele[min_index].style.background = '#22A39F';
              }
              min_index = j;
          } 
          else{
              // if the currnent comparision is more than min_index change is back to normal
              ele[j].style.background = '#22A39F';
          }   
      }
      await waitforme(delay);
      swap(ele[min_index], ele[i]);
      // change the min element index back to normal as it is swapped 
      ele[min_index].style.background = '#22A39F';
      // change the sorted elements color to green
      ele[i].style.background = 'green';
  }
}

async function partitionLomuto(ele, l, r){
  const arrSpeed = document.getElementById('speed-slider');
  const delay = 101 - arrSpeed.value;

  console.log('In partitionLomuto()');
  let i = l - 1;
  // color pivot element
  ele[r].style.background = 'red';
  for(let j = l; j <= r - 1; j++){
      console.log('In partitionLomuto for j');
      // color current element
      ele[j].style.background = 'yellow';
      // pauseChamp
      await waitforme(delay);

      if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
          console.log('In partitionLomuto for j if');
          i++;
          swap(ele[i], ele[j]);
          // color 
          ele[i].style.background = 'orange';
          if(i != j) ele[j].style.background = 'orange';
          // pauseChamp
          await waitforme(delay);
      }
      else{
          // color if not less than pivot
          ele[j].style.background = 'pink';
      }
  }
  i++; 
  // pauseChamp
  await waitforme(delay);
  swap(ele[i], ele[r]); // pivot height one
  console.log(`i = ${i}`, typeof(i));
  // color
  ele[r].style.background = 'pink';
  ele[i].style.background = 'green';

  // pauseChamp
  await waitforme(delay);
  
  // color
  for(let k = 0; k < ele.length; k++){
      if(ele[k].style.background != 'green')
          ele[k].style.background = '#22A39F';
  }

  return i;
}

async function quickSort(ele, l, r){
  console.log('In quickSort()', `l=${l} r=${r}`, typeof(l), typeof(r));
  if(l < r){
      let pivot_index = await partitionLomuto(ele, l, r);
      await quickSort(ele, l, pivot_index - 1);
      await quickSort(ele, pivot_index + 1, r);
  }
  else{
      if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
          ele[r].style.background = 'green';
          ele[l].style.background = 'green';
      }
  }
}

async function merge(ele, low, mid, high){
  const arrSpeed = document.getElementById('speed-slider');
  const delay = 101 - arrSpeed.value;

  console.log('In merge()');
  console.log(`low=${low}, mid=${mid}, high=${high}`);
  const n1 = mid - low + 1;
  const n2 = high - mid;
  console.log(`n1=${n1}, n2=${n2}`);
  let left = new Array(n1);
  let right = new Array(n2);

  for(let i = 0; i < n1; i++){
      await waitforme(delay);
      console.log('In merge left loop');
      console.log(ele[low + i].style.height + ' at ' + (low+i));
      // color
      ele[low + i].style.background = 'orange';
      left[i] = ele[low + i].style.height;
  }
  for(let i = 0; i < n2; i++){
      await waitforme(delay);
      console.log('In merge right loop');
      console.log(ele[mid + 1 + i].style.height + ' at ' + (mid+1+i));
      // color
      ele[mid + 1 + i].style.background = 'yellow';
      right[i] = ele[mid + 1 + i].style.height;
  }
  await waitforme(delay);
  let i = 0, j = 0, k = low;
  while(i < n1 && j < n2){
      await waitforme(delay);
      console.log('In merge while loop');
      console.log(parseInt(left[i]), parseInt(right[j]));
      
      // To add color for which two r being compared for merging
      
      if(parseInt(left[i]) <= parseInt(right[j])){
          console.log('In merge while loop if');
          // color
          if((n1 + n2) === ele.length){
              ele[k].style.background = 'green';
          }
          else{
              ele[k].style.background = 'lightgreen';
          }
          
          ele[k].style.height = left[i];
          i++;
          k++;
      }
      else{
          console.log('In merge while loop else');
          // color
          if((n1 + n2) === ele.length){
              ele[k].style.background = 'green';
          }
          else{
              ele[k].style.background = 'lightgreen';
          } 
          ele[k].style.height = right[j];
          j++;
          k++;
      }
  }
  while(i < n1){
      await waitforme(delay);
      console.log("In while if n1 is left");
      // color
      if((n1 + n2) === ele.length){
          ele[k].style.background = 'green';
      }
      else{
          ele[k].style.background = 'lightgreen';
      }
      ele[k].style.height = left[i];
      i++;
      k++;
  }
  while(j < n2){
      await waitforme(delay);
      console.log("In while if n2 is left");
      // color
      if((n1 + n2) === ele.length){
          ele[k].style.background = 'green';
      }
      else{
          ele[k].style.background = 'lightgreen';
      }
      ele[k].style.height = right[j];
      j++;
      k++;
  }
}

async function mergeSort(ele, l, r){
  console.log('In mergeSort()');
  if(l >= r){
      console.log(`return cause just 1 elemment l=${l}, r=${r}`);
      return;
  }
  const m = l + Math.floor((r - l) / 2);
  console.log(`left=${l} mid=${m} right=${r}`, typeof(m));
  await mergeSort(ele, l, m);
  await mergeSort(ele, m + 1, r);
  await merge(ele, l, m, r);
}


export default function Home() {
  const [array, setArray] = useState([]);
  const PRIMARY_COLOR = '#22A39F';
  const [executionTime, setExecutionTime] = useState(0);
  
  const resetArray=()=>{
    const newarray = [];
    const arrSize=document.getElementById('slider');
    for (let i = 0; i < arrSize.value; i++) {
      newarray.push(randomIntFromInterval(15, 350));
    }
    setArray(newarray);
    setExecutionTime(0);

    const ele = document.querySelectorAll(".array-bar");
    for(let i = 0; i < ele.length; i++){
      ele[i].style.background = '#22A39F';
  }

   }
   const handleSizeChange = (event) => {
    const newSize = event.target.value;
    const newarray = [];
    for (let i = 0; i < newSize; i++) {
      newarray.push(randomIntFromInterval(15, 350));
    }
    setArray(newarray);
  };

  async function startBubble(){
    disableBtns();
    const startTime= performance.now()
    await bubble();
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(executionTime*0.001);
    setExecutionTime(executionTime);
    enableBtns();
    
  }

  async function startInsertion(){
    disableBtns();
    const startTime= performance.now()
    await insertion();
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(executionTime*0.001);
    setExecutionTime(executionTime);
    enableBtns();
  }

  async function startSelection(){
    disableBtns();
    const startTime= performance.now()
    await selection();
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(executionTime*0.001);
    setExecutionTime(executionTime);
    enableBtns();
  }

  async function startQuickSort(){
    disableBtns();
    let ele = document.querySelectorAll('.array-bar');
    let l = 0;
    let r = ele.length - 1;
    const startTime= performance.now()
    await quickSort(ele,l,r);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(executionTime*0.001);
    setExecutionTime(executionTime);
    enableBtns();
  }

  async function startMergeSort(){
    disableBtns();
    let ele = document.querySelectorAll('.array-bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    const startTime= performance.now()
    await mergeSort(ele,l,r);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(executionTime*0.001);
    setExecutionTime(executionTime);
    enableBtns();
  }

  
   

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
            <button id='selection' disabled={array.length==0 ? true : false} className='sort-btn' onClick={startSelection}>
            Selection Sort
            </button>
            <button id='quick' disabled={array.length==0 ? true : false} className='sort-btn' onClick={startQuickSort}>
            Quick Sort
            </button>
            <button id='merge' disabled={array.length==0 ? true : false} className='sort-btn' onClick={startMergeSort}>
            Merge Sort
            </button>
        </div>

        <div className="slider-controls">
            <div>
                <h1>Speed</h1>
                <input disabled={array.length==0 ? true : false} id='speed-slider' type="range" min={1} max={100} className="range-style"></input>
            </div>
            <div>
                <h1>Size</h1>
                <input disabled={array.length==0 ? true : false} onChange={handleSizeChange} type="range" min={10} max={125} id='slider' className="range-style"></input>
            </div>
        </div>
    </div>
     <div className="main-heading">
     <div className="title">
     <Image src="/images/sort_logo.png" width={25} height={25}/>
     <h1 className='large rise'>Sorting Visualizer</h1>
     </div>
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
     <div className="exec-time">
      <h1 style={{color:"white"}}>Time: {Number((executionTime * 0.001).toFixed(2))} s</h1>
     </div>
     </div>
     </div>
    </>
  )
}