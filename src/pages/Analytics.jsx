
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsThreeDotsVertical } from 'react-icons/bs'
import {AiOutlineStar,AiOutlineQuestionCircle,AiOutlineGift} from 'react-icons/ai'
import "../index.css"
import Header from "./header";

const API_URL = "https://api.example.com/random-data"; // Replace with your random API URL

// fake data generator

// const getItems = (count, offset = 0) => {
//   return axios
//     .get(`${API_URL}?count=${count}&offset=${offset}`)
//     .then(response => {
//       const data = response.data;
//       return data.map((item, index) => ({
//         id: `item-${offset + index}-${new Date().getTime()}`,
//         name: item.name,
//         city: item.city
//       }));
//     })
//     .catch(error => {
//       console.error("Error fetching data from API:", error);
//       return [];
//     });
// };

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    // content: `item ${k + offset}`,
    name:`iam`,
    city:`NEO`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function Dashboard() {
  // const [state, setState] = useState([]);
  const [state, setState] = useState([getItems(4), getItems(3,5)]);
  function onDragEnd(result) {
    const { source, destination } = result;

   
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (
    <div
    style={{
      backgroundColor:"white",
      height:"1rem",
      padding:'1rem',
      paddingLeft:'3rem'
    }}
    >
      <Header/>
      <div>
      <div
      className="buttons"
      style={{

        justifyContent:"flex-end",
        paddingBottom:"1rem"
      }}
      >
      <button
      style={{
        marginTop: "2rem",
        marginRight: "25px",
        paddingRight: "1rem",
        padding: "10px",
        backgroundColor: "blue",
        color: "white", // Set text color to white
        border: "none", // Remove border
        borderRadius: "1px", // Add border radius for rounded corners
        cursor: "pointer", // Show pointer cursor on hover
       
      }}
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
      style={{
        marginTop: "2rem",
        marginRight: "25px",
        paddingRight: "1rem",
        padding: "10px",
        backgroundColor: "darkblue",
        color: "white", // Set text color to white
        border: "none", // Remove border
        borderRadius: "1px", // Add border radius for rounded corners
        cursor: "pointer", // Show pointer cursor on hover
      }}
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      </div></div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={
                            getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              padding:".7rem",
                              backgroundColor: "white",
                              display: "flex",
                              height: "5rem"
                            }}
                          >
                          
                            {item.content}
                            <h4>{item.name}</h4>
                            <br />
                            <h4>{item.city}</h4>
                            </div>
                            <div style={{
                              backgroundColor:"lightgrey",
                              height:'2rem',
                              display:'flex',
                              alignItems:"center"
                          }}>
                           
                            <div
                            style={{
                              marginLeft:"5px",
                              alignItems:"left"
                            }}
                            >
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                            <AiOutlineStar/></div>
                            <div
                            style={{
                              paddingLeft:"6rem",
                              display:"flex",
                              justifyContent:'flex-end'
                          }}>
                            <img src={require('./t.png')}
                            style={
                             { height:"1.3rem",
                            borderRadius:"45px"
                            }
                            }
                            />
                              <BsThreeDotsVertical
                              size={"1.3rem"}
                              /></div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
export default Dashboard;
