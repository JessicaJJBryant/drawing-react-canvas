// REACT Code Along Project--LET'S BUILD A DRAWING APPLICATION USING REACT AND CANVAS API
// drawing-react-canvas CodeAlong from Maksim Ivanov youtube.com/watch?v=FLESHMJ-bI0

// Removed the two imports and everything inside the App function component
// Added this import line:
import React, { useRef, useEffect, useState } from 'react';

function App() {
  // Ref object that holds the reference to our canvas element:
  const canvasRef = useRef(null)
  // Ref object that holds the reference to our 2d context (IN REACT, WE CAN USE REFs to store not only element refs but also to preserve any information we need between re-renders):
  const contextRef = useRef(null)
  // setting a useState for the drawing
  const [isDrawing, setIsDrawing] = useState(false)

  // useEffect Hook with a defined callback used to initialize our canvas API when our component is mounted:
  useEffect(() => {
    // reference to canvas:
    const canvas = canvasRef.current;
    // to support computers with higher screen density (doubling the screen density)...window.inner____is the viewport:
    canvas.width=window.innerWidth*2;
    canvas.height=window.innerHeight*2;
    // the style of the canvas (must provide px here and no doubling):
    canvas.style.width=`${window.innerWidth}px`;
    canvas.style.height=`${window.innerHeight}px`;
    // providing the 2d context to be able to draw on our canvas and certain values to make the drawing customized:
    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap="round"
    context.strokeStyle="blue"
    context.lineWidth=5
    contextRef.current=context;
    // callback will trigger only once when our component mounts, []:
  }, [])
  // Defining the 3 handlers:
  // 1. called below when we press the mouse
  const startDrawing = ({nativeEvent}) => {
    // With the nativeEvent, we can startDrawing at the location when the mouse is pressed.
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    // setting the useState to true so the drawing can start:
    setIsDrawing(true)
  }
  // 2. called below when we stop pressing the mouse
  const finishDrawing = () => {
    // all drawing will stop at the location when the mouse is no longer being pressed:
    contextRef.current.closePath()
    setIsDrawing(false)
  }
  // 3. called below when we move the mouse
  const draw = ({nativeEvent}) => {
    // This if statement reduces the nesting overall. If the mouse is not being moved, it will just return:
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    // Every time the mouse is moved, we need to draw a line to the new coordinates:
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  return (
    // Returning canvas with 3 event listeners and passing a ref so we're able to use the canvas:
    <canvas
      // each of our event listeners is assigned to each of our handlers:
      onMouseDown={startDrawing} 
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      // passing the ref:
      ref={canvasRef}
    />
  );
}
export default App;
