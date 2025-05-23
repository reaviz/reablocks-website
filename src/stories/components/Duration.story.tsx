import React, { Fragment } from 'react';
import { Duration } from 'reablocks';

export default {
  title: 'Components/Data/Duration',
  component: Duration
};

export const Simple = () => (
  <Fragment>
    <Duration value="0" />
    <br />
    <Duration value="1" />
    <br />
    <Duration value="125" />
    <br />
    <Duration value="256" />
    <br />
    <Duration value="1234567" />
    <br />
    <Duration value="123456789101" />
    <br />
    <Duration value={12345678910121314} />
  </Fragment>
);

export const CustomZero = () => <Duration value="0" zeroValue="No value" />;

export const Empty = () => (
  <Fragment>
    <Duration value={null} />
    <br />
    <Duration value={undefined} />
    <br />
  </Fragment>
);

export const CustomEmpty = () => (
  <Duration value={null} emptyValue="Nothing to see" />
);
