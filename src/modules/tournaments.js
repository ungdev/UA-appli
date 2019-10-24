import { actions as notifActions } from 'redux-notifications';
import axios from '../lib/axios';
import errorToString from '../lib/errorToString';

export const SET_SPOTLIGHTS = 'tournaments/SET_SPOTLIGHTS';
export const SET_SPOTLIGHT_TEAMS = 'tournaments/SET_SPOTLIGHT_TEAMS';
export const SET_SPOTLIGHT_STATE = 'tournaments/SET_SPOTLIGHT_STATE';
export const ADD_SPOTLIGHT_STATE = 'tournaments/ADD_SPOTLIGHT_STATE';
export const SET_SPOTLIGHT_STAGES = 'tournaments/SET_SPOTLIGHT_STAGES';
export const SET_SPOTLIGHT_MATCHES = 'tournaments/SET_SPOTLIGHT_MATCHES';
export const SET_LIBRE_PLAYERS = 'tournaments/SET_LIBRE_PLAYERS';

const initialState = {
  tournaments: [],
  teams: [],
  stages: {},
  matches: {},
};

export default (state = initialState, action) => {
  let tournaments;
  let index;
  switch (action.type) {
    case SET_SPOTLIGHTS:
      if (!action.payload) return state;
      if (!state.tournaments) state.tournaments = [];
      tournaments = state.tournaments.slice();
      if (!tournaments) tournaments = [];
      action.payload.forEach((tournament) => {
        const found = tournaments.find((s) => tournament.id === s.id); // if we find a matching tournament
        if (!found) tournaments.push(tournament); // we do not add it to the tab
      });
      tournaments.sort((s1, s2) => (s1.id > s2.id ? 1 : -1));
      return { ...state, tournaments };
    case SET_SPOTLIGHT_STATE:
      tournaments = state.tournaments.splice(0);
      index = tournaments.findIndex(
        (tournament) => tournament.id === parseInt(action.payload.tournamentId, 10)
      );
      if (index === -1) {
        return state;
      }
      tournaments[index].state = action.payload.stateValue;
      return {
        ...state,
        tournaments,
      };
    case ADD_SPOTLIGHT_STATE:
      tournaments = state.tournaments.splice(0);
      index = tournaments.findIndex(
        (tournament) => tournament.id === parseInt(action.payload.tournamentId, 10)
      );
      if (index === -1) return state;
      tournaments[index].states.push(action.payload.newState);
      return { ...state, tournaments };
    case SET_SPOTLIGHT_TEAMS:
      const teams = state.teams.splice(0);
      action.payload.forEach((newteam) => {
        const found = teams.find((team) => team.id === newteam.id);
        if (!found) {
          teams.push(newteam);
        }
      });
      return {
        ...state,
        teams,
      };
    case SET_SPOTLIGHT_STAGES:
      return {
        ...state,
        stages: {
          ...state.stages,
          [action.payload.tournamentId]: action.payload.stages,
        },
      };
    case SET_SPOTLIGHT_MATCHES:
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.tournamentId]: action.payload.matches,
        },
      };
    case SET_LIBRE_PLAYERS:
      return {
        ...state,
        librePlayers: action.payload,
      };
    default:
      return state;
  }
};

export const fetchTournaments = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;
    const oldTournaments = getState().tournaments.tournaments;

    if (!authToken || authToken.length === 0) return;

    const tournaments = await axios.get('tournaments', {
      headers: { 'X-Token': authToken },
    });
    if (oldTournaments.length !== tournaments.data.length) {
      dispatch({
        type: SET_SPOTLIGHTS,
        payload: tournaments.data,
      });
    }
  };
};

export const fetchTournamentStages = (tournamentId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;

    if (!authToken || authToken.length === 0) return;

    const res = await axios.get(`tournaments/${tournamentId}/stages`, {
      headers: { 'X-Token': authToken },
    });
    if (res.status === 200) {
      dispatch({
        type: SET_SPOTLIGHT_STAGES,
        payload: { tournamentId, stages: res.data },
      });
    }
  };
};

export const fetchTournamentMatches = (tournamentId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;

    if (!authToken || authToken.length === 0) return;

    const res = await axios.get(`tournaments/${tournamentId}/matches`, {
      headers: { 'X-Token': authToken },
    });
    if (res.status === 200) {
      dispatch({
        type: SET_SPOTLIGHT_MATCHES,
        payload: {
          matches: res.data,
          tournamentId,
        },
      });
    }
  };
};

export const setTournamentState = (tournamentId, stateValue) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;

    if (!authToken || authToken.length === 0) return;

    try {
      const res = await axios.put(
        `states/${tournamentId}`,
        { value: stateValue },
        { headers: { 'X-Token': authToken } }
      );
      if (res.status === 200) {
        dispatch({
          type: SET_SPOTLIGHT_STATE,
          payload: { tournamentId, stateValue },
        });
      }
    }
 catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000,
        })
      );
    }
  };
};

export const addState = (tournamentId, title, desc, popover) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;

    if (!authToken || authToken.length === 0) return;

    try {
      const res = await axios.post(
        `states/${tournamentId}`,
        { title, desc, popover },
        { headers: { 'X-Token': authToken } }
      );
      if (res.status === 200) {
        dispatch({
          type: ADD_SPOTLIGHT_STATE,
          payload: { tournamentId, newState: res.data },
        });
      }
    }
 catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000,
        })
      );
    }
  };
};

export const fetchTeamsByTournamentId = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;

    if (!authToken || authToken.length === 0) {
      return;
    }
    try {
      const req = await axios.get(`tournaments/${id}/teams`, {
        headers: { 'X-Token': authToken },
      });
      dispatch({
        type: SET_SPOTLIGHT_TEAMS,
        payload: req.data,
      });
    }
 catch (err) {
      console.log(err);
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000,
        })
      );
    }
  };
};

export const fetchLibrePlayers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token;

    if (!authToken || authToken.length === 0) {
      return;
    }
    try {
      const req = await axios.get('tournaments/libre/players', {
        headers: { 'X-Token': authToken },
      });
      dispatch({
        type: SET_LIBRE_PLAYERS,
        payload: req.data,
      });
    }
 catch (err) {
      console.log(err);
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000,
        })
      );
    }
  };
};
