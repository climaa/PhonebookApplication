import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AddContactSection} from '../../app/sections';

describe('AddContactSection', () => {
  it('renders all input fields', () => {
    const {getByPlaceholderText} = render(<AddContactSection />);
    expect(getByPlaceholderText('Name')).toBeDefined();
    expect(getByPlaceholderText('Last Name')).toBeDefined();
    expect(getByPlaceholderText('Phone Number')).toBeDefined();
    expect(getByPlaceholderText('Email Address')).toBeDefined();
    expect(getByPlaceholderText('Contact Type')).toBeDefined();
  });

  it('updates input values correctly', () => {
    const {getByPlaceholderText} = render(<AddContactSection />);
    fireEvent.changeText(getByPlaceholderText('Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '123456789');
    fireEvent.changeText(
      getByPlaceholderText('Email Address'),
      'john@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('Contact Type'), 'Work');

    expect(getByPlaceholderText('Name').props.value).toBe('John');
    expect(getByPlaceholderText('Last Name').props.value).toBe('Doe');
    expect(getByPlaceholderText('Phone Number').props.value).toBe('123456789');
    expect(getByPlaceholderText('Email Address').props.value).toBe(
      'john@example.com',
    );
    expect(getByPlaceholderText('Contact Type').props.value).toBe('Work');
  });
});
