import { SET_TICKETS, UPDATE_TICKET } from '../actions/tickets';
const initialState = {
    tickets: []
}

const ticketsReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_TICKETS:
            return {
                tickets: action.tickets
            }
        case UPDATE_TICKET:
            return {
                tickets: action.updatedTickets
            }
        default:
            return state
    }
}

export default ticketsReducer;