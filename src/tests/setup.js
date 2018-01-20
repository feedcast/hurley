import React from 'react';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => props => <Component t={(key) => key} {...props} />,
}));

