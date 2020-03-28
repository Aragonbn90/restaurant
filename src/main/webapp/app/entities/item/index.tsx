import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Item from './item';
import ItemDetail from './item-detail';
import ItemUpdate from './item-update';
import ItemDeleteDialog from './item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ItemDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={Item} />
    </Switch>
  </>
);

export default Routes;
