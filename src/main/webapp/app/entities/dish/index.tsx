import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Dish from './dish';
import DishDetail from './dish-detail';
import DishUpdate from './dish-update';
import DishDeleteDialog from './dish-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DishDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DishUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DishUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DishDetail} />
      <ErrorBoundaryRoute path={match.url} component={Dish} />
    </Switch>
  </>
);

export default Routes;
