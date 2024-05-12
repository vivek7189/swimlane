import React, { useState, useEffect } from "react";
import List from "./cardlist/List";
import initialData from "./config/data";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { ReactComponent as EmptySvg } from "./image.svg";
import Modal from "./modal/modal";


const Container = styled.div`
  display: flex;
  padding: 20px;
  overflow: auto;
`;

const Header = styled.header`
  background-color: #20a252;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  width: 400px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  background-color: #190202;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #f0f0f0;
  }
`;

const AddListContainer = styled.div`
  align-self: center;
  display: flex;
  gap: 20px;
`;

const AddListButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  background-color: #b94137; /* Red color */
  color: white;
  cursor: pointer;
  :hover {
    background-color: #ff6655; /* Lighter red on hover */
  }
`;

const AddTodoInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ResetButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  background-color: #05481f; /* Green color */
  color: white;
  cursor: pointer;
  :hover {
    background-color: #1a9347; /* Darker green on hover */
  }
`;

const BrandName = styled.h1`
  align-self: center;
  color: white;
  @media (max-width: 480px) {
    align-self: center;
  }
`;

const UpdateConfigButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  background-color: #2061d1; /* Blue color */
  color: white;
  cursor: pointer;
  :hover {
    background-color: #2c6ad9; /* Darker blue on hover */
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 100px;
  right: 3px;
  padding: 10px;
  background-color: #ff6347;
  color: white;
  border-radius: 5px;
  animation: fadeInOut 0.5s ease-out;
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Trello = () => {
  const [board, setBoard] = useState(initialData);
  const [toggleInput, setToggleInput] = useState(false);
  const [listName, setListName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updatedConfig, setUpdatedConfig] = useState(JSON.stringify(initialData, null, 2));
  const resetBoard = () => {
    setBoard(initialData);
  };
  const updateBoardConfig = () => {

    try {
      const updatedData = JSON.parse(updatedConfig);
      setBoard(updatedData);
      setShowModal(false); 
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = board.lists[source.droppableId];
    const finish = board.lists[destination.droppableId];
    const card = board.cards[draggableId];
    if (!card.allowedLists.includes(destination.droppableId)) {
      setNotification("This card cannot be moved to this list!");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      return;
    }
  
    const newStartCardIds = Array.from(start.cardIds);
    newStartCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: newStartCardIds,
    };
  
    let newFinishCardIds;
    if (start === finish) {
      newFinishCardIds = Array.from(finish.cardIds);
      newFinishCardIds.splice(source.index, 1);
      newFinishCardIds.splice(destination.index, 0, draggableId);
    } else {
      newFinishCardIds = Array.from(finish.cardIds);
      newFinishCardIds.splice(destination.index, 0, draggableId);
    }
    const newFinish = {
      ...finish,
      cardIds: newFinishCardIds,
    };
    
    const newBoard = {
      ...board,
      lists: {
        ...board.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
      cards: {
        ...board.cards,
        [card.id]: {
          ...card,
          history: [...card.history, finish.id],
        },
      },
    };
  
    setBoard(newBoard);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addList(listName);
      setListName("");
      setToggleInput(false);
    }
  };

  const addList = (listName) => {
    if (listName) {
      const listId = `list-${board.listOrder.length + 1}`;
      const newList = {
        id: listId,
        title: listName,
        cardIds: [],
      };
      const newListOrder = [...board.listOrder, listId];
      const newBoard = {
        ...board,
        listOrder: newListOrder,
        lists: {
          ...board.lists,
          [listId]: newList,
        },
      };
      setBoard(newBoard);
    }
  };

  const deleteList = (listId) => {
    const newListOrder = board.listOrder.filter((id) => id !== listId);
    const newLists = { ...board.lists };
    delete newLists[listId];

    for (const cardId of board.lists[listId].cardIds) {
      delete newLists[cardId];
    }

    setBoard({
      ...board,
      listOrder: newListOrder,
      lists: newLists,
    });
  };
  const updateCard = (listId,updatedCard) => {

    const cardIndex = board.lists[listId].cardIds.indexOf(updatedCard.id);

    const newBoard = {
      ...board,
      cards: {
        ...board.cards,
        [updatedCard.id]: updatedCard,
      },
      lists: {
        ...board.lists,
        [listId]: {
          ...board.lists[listId],
          cardIds: [...board.lists[listId].cardIds.slice(0, cardIndex), updatedCard.id, ...board.lists[listId].cardIds.slice(cardIndex + 1)],
        },
      },
    };
    setBoard(newBoard);
  };
  const addCard = (listId, cardDetails) => {
    const newCardId = `card-${board.cardIdMaker + 1}`;
    const newCard = {
      id: newCardId,
      title: cardDetails.title,
      description: cardDetails.description,
      history:[listId],
      allowedLists: ["to-do", "in-progress", "done", listId],
    };

    const newBoard = {
      ...board,
      cards: {
        ...board.cards,
        [newCard.id]: newCard,
      },
      lists: {
        ...board.lists,
        [listId]: {
          ...board.lists[listId],
          cardIds: [...board.lists[listId].cardIds, newCard.id],
        },
      },
      cardIdMaker: board.cardIdMaker + 1,
    };

    setBoard(newBoard);
  };

  const deleteCard = (listId, cardId) => {
    const newList = {
      ...board.lists[listId],
      cardIds: board.lists[listId].cardIds.filter((id) => id !== cardId),
    };
  
    const newBoard = {
      ...board,
      lists: {
        ...board.lists,
        [listId]: newList,
      },
    };
  
    delete newBoard.cards[cardId];
  
    setBoard(newBoard);
  };
  

  return (
    <div>
      <Header>
      <BrandName className="nav-title">Swimlane</BrandName>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <SearchButton>Search</SearchButton>
        </SearchContainer>
        <AddListContainer>
          <AddListButton
            className="add-list-btn"
            placeholder=""
            onClick={() => setToggleInput(!toggleInput)}
          >
            {toggleInput ? "Cancel" : "Add Stage"}
          </AddListButton>
          <ResetButton onClick={resetBoard}>Reset</ResetButton>
          {toggleInput ? (
            <AddTodoInput
              autoFocus
              type="text"
              onChange={(e) => setListName(e.target.value)}
              value={listName}
              onKeyPress={handleKeyPress}
              placeholder="Enter stage..."
            />
          ) : null}
           <UpdateConfigButton onClick={() => setShowModal(true)}>Update Config</UpdateConfigButton>
        </AddListContainer>
       
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        {board.listOrder.length === 0 ? (
          <EmptySvg style={{ width: "80%", marginLeft: "5px" }} />
        ) : null}
       
        <Container>
          {board.listOrder.map((listId) => {
            const list = board.lists[listId];
            const cards = list.cardIds.map((cardId) => board.cards[cardId]);
            const filteredCards = cards.filter((card) =>
              card?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
            );

            return (
              <List
                key={list.id}
                list={list}
                cards={filteredCards}
                deleteList={deleteList}
                addCard={addCard}
                deleteCard={deleteCard}
                updateCard={updateCard}
              />
            );
          })}
        </Container>
        {notification && <Notification>{notification}</Notification>}
        {showModal && (
          <Modal
            title="Update Config"
            onClose={() => setShowModal(false)}
            onSave={updateBoardConfig}
          >
            <textarea
              value={updatedConfig}
              onChange={(e) => setUpdatedConfig(e.target.value)}
              rows={20}
              cols={40}
            />
          </Modal>
        )}
      </DragDropContext>
    </div>
  );
};

export default Trello;
