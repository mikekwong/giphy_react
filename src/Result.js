import React from "react";

const Result = ({
  result: {
    title,
    images: {
      fixed_height_downsampled: { url }
    }
  }
}) => {
  return (
    <div>
      <img src={url} alt={title} />
    </div>
  );
};

export default Result;
