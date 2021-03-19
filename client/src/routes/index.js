import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Rotas importadas
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Repository from '../pages/Repository';

// Componentes com as rotas
function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/users/:repository+" component={Repository} />
        <Route path="/404" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;