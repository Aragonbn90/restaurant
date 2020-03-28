import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Menu from './menu';
import MenuDetail from './menu-detail';
import MenuUpdate from './menu-update';
import MenuDeleteDialog from './menu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MenuDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MenuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MenuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MenuDetail} />
      <ErrorBoundaryRoute path={match.url} component={Menu} />
    </Switch>
  </>
);

export default Routes;
