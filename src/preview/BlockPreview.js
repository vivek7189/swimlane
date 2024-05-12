import React from "react";

const BlockPreview = ({ block }) => {
  return (
    <div className="block-card"> 
      <h3 className="block-title"> {block.title}</h3> 
      <h4 className="block-history-heading">History:</h4> 
      <ul className="block-history-list"> 
        {block.history.map((transition, index) => (
          <li className="block-history-item" key={index}>{transition}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlockPreview;
