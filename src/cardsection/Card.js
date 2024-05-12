import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import BlockPreview from "../preview/BlockPreview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
const Container = styled.div`
  border: 1px solid #20a252;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: #fff;
  color: ${(props) => (props.isDragging ? "darkgreen" : "black")};
  font-size: ${(props) => (props.isDragging ? "20px" : "16px")};
  font-weight: ${(props) => (props.isDragging ? "600" : "400")};
`;

const DeleteButtonCard = styled.button`
  justify-self: center;
  align-self: center;
  padding: 4px;
  margin: 0px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: red;
  color: white;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
`;

const CardHeaderTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
`;

const CardDetails = styled.div``;

const CardDetailsContent = styled.p`
  font-size: 14px;
`;

const Card = ({ card, index, listId, deleteCard, updateCard }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description);

  const handleClick = () => {
    setShowPreview(!showPreview);
  };

  const handleEdit = (e,listId) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e,listId,cardId) => {
    e.stopPropagation();
    const updatedCard = {
      ...card,
      title: editedTitle,
      description: editedDescription,
    };
    updateCard(listId,updatedCard);

    setIsEditing(false);
  };
const deleteCardID=(e,listId, cardId)=>{
  e.stopPropagation();
  deleteCard(listId, cardId);
}
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={handleClick}
        >
          <CardHeader>
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <CardHeaderTitle>{card.title}</CardHeaderTitle>
            )}
            <div className="icon">
              {isEditing ? (
                <button onClick={(e) => handleSave(e,listId, card.id)} > <FontAwesomeIcon icon={faSave} /></button>
              ) : (
                <button onClick={(e) => handleEdit(e,listId, card.id)} ><FontAwesomeIcon icon={faEdit} /></button>
              )}
              <DeleteButtonCard onClick={(e) => deleteCardID(e,listId, card.id)}>
                 <FontAwesomeIcon icon={faTrash} />
              </DeleteButtonCard>
            </div>
          </CardHeader>
          <CardDetails>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <CardDetailsContent>{card.description}</CardDetailsContent>
            )}
          </CardDetails>
          {showPreview && <BlockPreview block={card} />}
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
