import React from "react";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  margin: 10px 0;
`;

const Result = ({
  result: {
    title,
    images: {
      fixed_height_downsampled: { url }
    }
  }
}) => {
  return (
    <>
      <Image src={url} alt={title} />
    </>
  );
};

export default Result;
