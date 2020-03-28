import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDish, defaultValue } from 'app/shared/model/dish.model';

export const ACTION_TYPES = {
  FETCH_DISH_LIST: 'dish/FETCH_DISH_LIST',
  FETCH_DISH: 'dish/FETCH_DISH',
  CREATE_DISH: 'dish/CREATE_DISH',
  UPDATE_DISH: 'dish/UPDATE_DISH',
  DELETE_DISH: 'dish/DELETE_DISH',
  RESET: 'dish/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDish>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DishState = Readonly<typeof initialState>;

// Reducer

export default (state: DishState = initialState, action): DishState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DISH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DISH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DISH):
    case REQUEST(ACTION_TYPES.UPDATE_DISH):
    case REQUEST(ACTION_TYPES.DELETE_DISH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DISH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DISH):
    case FAILURE(ACTION_TYPES.CREATE_DISH):
    case FAILURE(ACTION_TYPES.UPDATE_DISH):
    case FAILURE(ACTION_TYPES.DELETE_DISH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DISH):
    case SUCCESS(ACTION_TYPES.UPDATE_DISH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DISH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/dishes';

// Actions

export const getEntities: ICrudGetAllAction<IDish> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DISH_LIST,
    payload: axios.get<IDish>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDish> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DISH,
    payload: axios.get<IDish>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDish> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DISH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDish> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DISH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDish> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DISH,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
