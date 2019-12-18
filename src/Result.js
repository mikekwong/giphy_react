import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  margin: 10px;
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

Result.propTypes = {
  result: PropTypes.object.isRequired
};

export default Result;
