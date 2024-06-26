import React from 'react';
import { Arrow } from 'reablocks';

export default {
  title: 'Components/Elements/Arrow',
  components: Arrow
};

export const Directions = () => (
  <>
    <Arrow direction="up" /> <Arrow direction="down" />{' '}
    <Arrow direction="left" /> <Arrow direction="right" />
  </>
);
