import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  object-fit: cover;
  margin: 10px;
`;

const Result = ({
  result: {
    id,
    title,
    images: {
      fixed_width: { url }
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
