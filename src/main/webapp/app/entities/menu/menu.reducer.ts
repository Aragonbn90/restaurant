import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMenu, defaultValue } from 'app/shared/model/menu.model';

export const ACTION_TYPES = {
  FETCH_MENU_LIST: 'menu/FETCH_MENU_LIST',
  FETCH_MENU: 'menu/FETCH_MENU',
  CREATE_MENU: 'menu/CREATE_MENU',
  UPDATE_MENU: 'menu/UPDATE_MENU',
  DELETE_MENU: 'menu/DELETE_MENU',
  RESET: 'menu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMenu>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MenuState = Readonly<typeof initialState>;

// Reducer

export default (state: MenuState = initialState, action): MenuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MENU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MENU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MENU):
    case REQUEST(ACTION_TYPES.UPDATE_MENU):
    case REQUEST(ACTION_TYPES.DELETE_MENU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MENU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MENU):
    case FAILURE(ACTION_TYPES.CREATE_MENU):
    case FAILURE(ACTION_TYPES.UPDATE_MENU):
    case FAILURE(ACTION_TYPES.DELETE_MENU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MENU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MENU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MENU):
    case SUCCESS(ACTION_TYPES.UPDATE_MENU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MENU):
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

const apiUrl = 'api/menus';

// Actions

export const getEntities: ICrudGetAllAction<IMenu> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MENU_LIST,
    payload: axios.get<IMenu>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMenu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MENU,
    payload: axios.get<IMenu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMenu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MENU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMenu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MENU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMenu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MENU,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
