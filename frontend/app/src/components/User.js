import React from 'react';
import styled from 'styled-components';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(80px, auto);
`; 

/**
 * Render User page 
 * to be developed
 */
export const User = () => (
  <GridWrapper>
    <h2>USER Page</h2>
    <p>to be developed.</p>
  </GridWrapper>
)