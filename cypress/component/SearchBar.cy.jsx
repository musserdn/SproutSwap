import React from 'react';
import { mount } from 'cypress/react';
import SearchBar from '../../client/src/components/SearchBar';

describe('SearchBar.cy.jsx', () => {
  it('renders the SearchBar component', () => {
    const onSearchMock = cy.stub().as('onSearchMock'); // Mock the onSearch function

    mount(<SearchBar onSearch={onSearchMock} placeholder="Search for plants..." />);

    // Check if the input and button are rendered
    cy.get('input').should('exist').and('have.attr', 'placeholder', 'Search for plants...');
    cy.get('button').should('exist');
  });

  it('calls onSearch when the form is submitted', () => {
    const onSearchMock = cy.stub().as('onSearchMock'); // Mock the onSearch function

    mount(<SearchBar onSearch={onSearchMock} placeholder="Search for plants..." />);

    // Type into the input field
    cy.get('input').type('Rose');

    // Submit the form
    cy.get('form').submit();

    // Assert that the onSearch function was called with the correct value
    cy.get('@onSearchMock').should('have.been.calledOnceWith', 'Rose');
  });
});