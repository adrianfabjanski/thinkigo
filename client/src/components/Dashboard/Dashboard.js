import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import "./Dashboard.css";
import Search from "./Search";
import { FaPlus, FaPencilAlt, FaBrain } from "react-icons/fa";
import Modal from "react-modal";
import { Link, useHistory, browser } from "react-router-dom";
import { fetchWrapper } from "../../fetchWrapper";
import AuthService from "../../AuthService";
import { uid } from "uid";
import generate from "project-name-generator";

function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [searchBoards, setSearchBoards] = useState([]);
  const history = useHistory();

  function fetchBoards() {
    return fetchWrapper(
      `/board/retrieve?email=${AuthService.getUserData().email}`,
      "GET"
    );
  }

  useEffect(() => {
    fetchBoards().then((res) => {
      setBoards(res.boards);
      setSearchBoards(res.boards);
    });
  }, []);

  function saveBoardInDb(boardId, generatedName) {
    fetchWrapper("/board/new", "POST", {
      boardId,
      name: generatedName,
      email: AuthService.getUserData().email,
    });
  }

  function navigateToBoard() {
    const id = uid(16);
    const generatedName = generate().spaced;
    history.push(`/board/${id}`);
    saveBoardInDb(id, generatedName);
  }

  const navigateToBrainstorm = () => {
    const id = uid(16);
    const generatedName = generate().spaced;
    history.push(`/brainstorm/${id}`);
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      overflow: "hidden",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "50%",
      height: "70%",
      bottom: "auto",
      border: "none",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0,0,0, 0)",
      overflow: "hidden",
    },
  };

  const ListBoards = () => {
    if (boards) {
      return boards.map((board) => (
        <div className="board-block" key={board.boardId}>
          <Link to={`/board/${board.boardId}`}>
            <h3 className="board-name">{board.name}</h3>
          </Link>
        </div>
      ));
    } else {
      return null;
    }
  };

  const handleSearch = (e) => {
    var filteredBoardList = searchBoards.filter(
      (board) =>
        board.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
    setBoards(filteredBoardList);
  };

  return (
    <div className="dashboard-container">
      <Navigation />
      <Search handleSearch={handleSearch} />
      <div id="boards-header-container">
        <h2 id="boards-header">Your boards:</h2>
      </div>
      <div className="boards-container">
        <div
          className="add-new-board-block"
          onClick={() => setModalIsOpen(true)}
        >
          <h3 className="add-new-board-text">New board</h3>
          <FaPlus id="add-new-board-icon" />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            console.log("called");
            setModalIsOpen(false);
          }}
          style={customStyles}
          id="modal"
        >
          <div className="modal-container">
            <div onClick={navigateToBoard}>
              <div className="add-new-board-block-modal">
                <h2 id="modal-block-text">New drawing board</h2>
                <FaPencilAlt id="modal-icon" />
              </div>
            </div>
            <div onClick={navigateToBrainstorm}>
              <div className="add-new-board-block-modal">
                <h2 id="modal-block-text">New retro board</h2>
                <FaBrain id="modal-icon" />
              </div>
            </div>
          </div>
        </Modal>
        <ListBoards />
      </div>
    </div>
  );
}

export default Dashboard;
