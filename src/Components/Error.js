import { Box } from "@mui/system";
import { Error } from "@mui/icons-material";
import styled from "@emotion/styled";
import React from 'react';

export default function ErrorBox(props) {
  const StyledBox = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 99fr;
    align-items: center;
    gap: 0.5em;
    color: white;
    font-weight: bold;
    background: rgb(255, 0, 0, 0.3);
    padding: 0.5em;
    border-radius: 0.5em;
  `;

  return (
    <StyledBox>
      <Error color="warning" />
      <span style={{ justifySelf: "center" }}> {props.text} </span>
    </StyledBox>
  );
}
