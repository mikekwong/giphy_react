import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  margin: 10px;
`;

const Result = ({
  result: {
    id,
    title,
    images: {
      fixed_height_downsampled: { url }
    }
  }
}) => {
  return (
    <>
      <Link to={`/gifs/${id}`}>
        <Image src={url} alt={title} />
      </Link>
    </>
  );
};

Result.propTypes = {
  result: PropTypes.object.isRequired
};

export default Result;
