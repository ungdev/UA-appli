import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_PLAYERS = 'hearthstone/SET_PLAYERS'
export const ADD_DECKS = 'hearthstone/ADD_DECKS'
export const DELETE_DECK = 'hearthstone/DELETE_DECK'

const initialState = {
  players: [],
  decks: [],
}

export default (state = initialState, action) => {
  let decks
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload
      }
    case ADD_DECKS:
      decks = state.decks.splice(0)
      decks[action.payload.id] = action.payload.deck
      return {
        ...state,
        decks
      }
    case DELETE_DECK:
      decks = state.decks.splice(0)
      let players = state.players.splice(0)
      decks[action.payload] = null
      const playerIndex = players.findIndex(player => player.decks.find(deck => deck.id === action.payload) !== undefined)
      const deckIndex = players[playerIndex].decks.findIndex(deck => deck.id === action.payload)
      players[playerIndex].decks.splice(deckIndex)
      return {
        ...state,
        decks,
        players
      }
    default:
      return state
  }
}

export const fetchHSPlayers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('hearthstone/players', { headers: { 'X-Token': authToken } })
      dispatch({ type: SET_PLAYERS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const addDeck = (name, deckstring) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(`hearthstone/decks`, { name, deckstring }, { headers: { 'X-Token': authToken } })
      dispatch(fetchHSPlayers())
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}


export const deleteDeck = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.delete(`hearthstone/decks/${id}`, { headers: { 'X-Token': authToken } })
      dispatch({ type: DELETE_DECK, payload: id })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}


export const getDeck = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get(`hearthstone/decks/${id}`, { headers: { 'X-Token': authToken } })
      dispatch({ type: ADD_DECKS, payload: { id, deck: res.data } })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}
