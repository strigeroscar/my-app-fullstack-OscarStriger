import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

function App() {
  const firstName = 'John';
  const lastName = 'Doe';

  return <h1>{`Hello, ${firstName} ${lastName}!`}</h1>;
}

export default App;
