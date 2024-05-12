import React from "react";
// Import CSS file for component styling

const BlockPreview = ({ block }) => {
  return (
    <div className="block-card"> {/* Apply card-like styling */}
      <h3 className="block-title"> {block.title}</h3> {/* Improve typography */}
      {/* <p className="block-description">Description: {block.description}</p>  */}
      <h4 className="block-history-heading">History:</h4> {/* Improve typography */}
      <ul className="block-history-list"> {/* Style history list */}
        {block.history.map((transition, index) => (
          <li className="block-history-item" key={index}>{transition}</li>
        ))}
        {/* {block.history.join("=>")} */}
      </ul>
    </div>
  );
};

export default BlockPreview;
