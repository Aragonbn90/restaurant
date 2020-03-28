import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Order from './order';
import OrderDetail from './order-detail';
import OrderUpdate from './order-update';
import OrderDeleteDialog from './order-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OrderDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrderDetail} />
      <ErrorBoundaryRoute path={match.url} component={Order} />
    </Switch>
  </>
);

export default Routes;
