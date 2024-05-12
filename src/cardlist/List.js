import React, { useState } from "react";
import styled from "styled-components";
import Card from "../cardsection/Card";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px grey;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 25%;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  @media (max-width: 480px) {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 75%;
  }
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 50px;
  background-color: ${(props) => (props.isDraggingOver ? "#81e0e3" : "white")};
`;

const DeleteListBtn = styled.button`
  justify-self: center;
  align-self: center;
  border: 0;
  background-color: white;
  color: black;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const AddCardButton = styled.button`
  background-color: #20a252;
  color: white;
  padding: 6px;
  font-weight: 600;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;

const ListHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: black;
  border-bottom: 2px solid black;
  letter-spacing: 2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
  background-color: #f9f9f9; /* Background color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow */
  border: 1px solid #ddd; /* Border */
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #81e0e3; /* Border color on focus */
  }
`;

const TextArea = styled.textarea`
  border: none;
  border-radius: 4px;
  padding: 10px;
  resize: vertical;
  width: 100%;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #81e0e3; /* Border color on focus */
  }
`;

const SubmitInput = styled.input`
  background-color: #20a252;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #207a52; /* Hover background color */
  }
`;

const List = ({ list, cards, deleteList, addCard, deleteCard,updateCard }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCardInputData = (event, listId) => {
    event.preventDefault();
    if (title && description) {
      const cardDetails = { title, description };
      addCard(listId, cardDetails);
      setTitle("");
      setDescription("");
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Container>
      <ListHeaderContainer>
        <Title>{list.title.toUpperCase()}</Title>
        <DeleteListBtn onClick={() => deleteList(list.id)}>
          &#x2716;
        </DeleteListBtn>
      </ListHeaderContainer>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            provided={provided}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {cards.map((card, index) => (
              <Card
                key={card.id}
                index={index}
                card={card}
                deleteCard={deleteCard}
                updateCard={updateCard}
                listId={list.id}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <AddCardButton onClick={toggleForm}>
        {showForm ? "Cancel" : "Add"}
      </AddCardButton>
      {showForm && (
        <Form onSubmit={(e) => handleCardInputData(e, list.id)}>
          <Input
            name="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            type="text"
            value={title}
            required
          />
          <TextArea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            value={description}
            required
          />
          <SubmitInput type="submit" value="Add Now" />
        </Form>
      )}
    </Container>
  );
};

export default List;
