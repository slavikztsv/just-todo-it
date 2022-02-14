import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Board from "./pages/Board/Board";
import BoardList from "./pages/BoardList/BoardList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BoardList />} />
          <Route
            path="board"
            element={
              <Board
                id=""
                name=""
                onDeleteClick={() => {}}
                onUpdateClick={() => {}}
              />
            }
          />
          <Route path="*" element={<p>NO ROUTE</p>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
