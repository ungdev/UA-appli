import axios from '../lib/axios'

export const SET_CONVERSATIONS = 'conversations/SET_CONVERSATIONS'
export const SET_CONVERSATIONS_LOADING = 'conversations/SET_CONVERSATIONS'

const initialState = {
  conversations: [],
  loading: false
}

export default (state = initialState, action) => {
  let conversations
  switch (action.type) {
    case SET_CONVERSATIONS:
      if (!action.payload) return state
      if (!state.infos) state.conversations = []
      //test has new elements
      conversations = state.conversations.splice(0) // peut poser probleme de splice
      if (!conversations) conversations = []
      action.payload.forEach(conversation => {
        let found = conversations.find(i => conversation.id === i.id) // if we find a matching spotlight
        if (!found) conversations.push(conversation) //we do not add it to the tab
      })
      // infos.sort((info1, info2) => info1.createdAt < info2.createdAt ? 1 : -1)
      return { conversations: conversations, loading: false }
    case SET_CONVERSATIONS_LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}

export const fetchConversations = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) return

    const res = await axios.get(`conversations`, {
      headers: { 'X-Token': authToken }
    })

    if(res.status === 200) {
      dispatch({
        type: SET_CONVERSATIONS,
        payload: res.data
      })
    }
  }
}