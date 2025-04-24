import { render, screen } from '@testing-library/react';
import { HiLockClosed } from 'react-icons/hi';
import { Label, Input } from './Input';

describe('FormElements', () => {
  describe('Label Component', () => {
    it('renders label with correct htmlFor and children', () => {
      render(<Label htmlFor="username">Username</Label>);
      const label = screen.getByText('Username');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'username');
    });
  });

  describe('Input Component', () => {
    it('renders input with correct attributes for password type', () => {
      render(
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          icon={HiLockClosed}
        />
      );
      const input = screen.getByPlaceholderText('Enter password');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
      expect(input).toHaveAttribute('name', 'password');
      expect(input).toHaveAttribute('id', 'password');
    });
  });
});
