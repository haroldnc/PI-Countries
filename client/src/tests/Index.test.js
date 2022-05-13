import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../containers/Index';

test('Expiamos el funcionamiento frl botón Start', () => {
   const index = render(
      <BrowserRouter>
         <Index />
      </BrowserRouter>
   );
   const button = index.getByText('Start');

   fireEvent.click(button);

   index.getByText('Start');
});
