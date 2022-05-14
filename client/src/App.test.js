import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from './App';

test('Renderiza las componentes del Index component', () => {
   const app = render(
      <BrowserRouter>
         <App />
      </BrowserRouter>
   );

   app.getByAltText('World Countries')
   app.getByText('Country App');
   app.getByText('Start');
   app.getByText('Search for countries in seconds and learn some interesting details');
});
