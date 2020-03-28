import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dish.reducer';
import { IDish } from 'app/shared/model/dish.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDishDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DishDetail = (props: IDishDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { dishEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Dish [<b>{dishEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{dishEntity.price}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{dishEntity.description}</dd>
          <dt>Order</dt>
          <dd>{dishEntity.orderId ? dishEntity.orderId : ''}</dd>
        </dl>
        <Button tag={Link} to="/dish" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dish/${dishEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ dish }: IRootState) => ({
  dishEntity: dish.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
