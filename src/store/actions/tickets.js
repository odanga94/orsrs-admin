import { database as firebaseDB } from "firebase";

import Ticket from "../../models/ticket";

export const SET_TICKETS = "SET_TICKETS";
export const UPDATE_TICKET = "UPDATE_TICKET";
export const ADD_TICKET = "ADD_TICKET";

export const fetchTickets = () => {
  return async (dispatch) => {
    try {
      const dataSnapshot = await firebaseDB().ref(`tickets/`).once("value");
      const resData = dataSnapshot.val();
      console.log('tickets', resData);
      const tickets = [];
      for (let ticketId in resData) {
        const {
          departure,
          departureDate,
          departureTime,
          destination,
          noOfAdultEconomyTickets,
          noOfAdultFirstClassTickets,
          noOfChildEconomyTickets,
          noOfChildFirstClassTickets,
          payerEmail,
          payerPhone,
          totalFare,
          trainRoute,
          trainType,
          passengerDetails
        } = resData[ticketId];

        // console.log("pass", passengerDetails["Adult - Economy"][0].firstName);
        let passengerName;
        if (passengerDetails["Adult - Economy"]){
            passengerName = passengerDetails["Adult - Economy"][0].firstName + " " + passengerDetails["Adult - Economy"][0].lastName;
            //console.log(passengerName);
        } else if (passengerDetails["Adult - First Class"]){
            passengerName = passengerDetails["Adult - First Class"][0].firstName + " " + passengerDetails["Adult - First Class"][0].lastName
        } else if (passengerDetails["Child - First Class"]){
            passengerName = passengerDetails["Child - First Class"][0].firstName + " " + passengerDetails["Child - First Class"][0].lastName
        } else{
            passengerName = passengerDetails["Child - Economy"][0].firstName  + " "+ passengerDetails["Child - Economy"][0].lastName
        }

        const newTicket = new Ticket(
          ticketId,
          departure,
          departureDate,
          departureTime,
          destination,
          noOfAdultEconomyTickets,
          noOfAdultFirstClassTickets,
          noOfChildEconomyTickets,
          noOfChildFirstClassTickets,
          payerEmail,
          payerPhone,
          totalFare,
          trainRoute,
          trainType,
          passengerName
        );
        tickets.push(newTicket);
      }

      //console.log('tickets', tickets);
      //console.log(loadedTickets);*/
      dispatch({
        type: SET_TICKETS,
        tickets,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong 😞");
    }
  };
};

/* export const updateTicket = (
  clientId,
  ticketId,
  status,
  assignedProId = null,
  amountPaid = null
) => {
  return async (dispatch, getState) => {
    const amountPaidInt = parseInt(amountPaid, 10);
    try {
      if (status === "in progress") {
        await firebaseDB().ref(`tickets/${clientId}/${ticketId}`).update({
          status,
          assignedProId,
        });
      } else if (status === "completed") {
        await firebaseDB().ref(`tickets/${clientId}/${ticketId}`).update({
          status,
          amountPaid: amountPaidInt,
        });
      } else {
        await firebaseDB().ref(`tickets/${clientId}/${ticketId}`).update({
          status,
        });
      }
      if (status === "completed" || status === "cancelled") {
        await firebaseDB().ref(`pending_jobs/${clientId}`).remove();
      }
      let indexOfTicketToUpdate;
      const currTickets = getState().tickets.tickets;
      const ticketToUpdate = currTickets.find((ticket, index) => {
        if (ticket.ticketId === ticketId && ticket.clientId === clientId) {
          indexOfTicketToUpdate = index;
          return true;
        }
        return false;
      });
      const updatedTicket = new Ticket(
        ticketId,
        clientId,
        ticketToUpdate.dateRequested,
        ticketToUpdate.service,
        status,
        ticketToUpdate.clientName,
        ticketToUpdate.clientAddress,
        ticketToUpdate.clientLocation,
        ticketToUpdate.clientPhone,
        ticketToUpdate.problemImage,
        ticketToUpdate.partsThatNeedWork,
        ticketToUpdate.problemDescription,
        ticketToUpdate.roomsThatNeedWork,
        ticketToUpdate.equipmentNeeded,
        ticketToUpdate.optionalInfo,
        ticketToUpdate.numberOfPeople,
        ticketToUpdate.serviceNeeded,
        ticketToUpdate.proGender,
        amountPaidInt,
        ticketToUpdate.assignedProId
          ? ticketToUpdate.assignedProId
          : assignedProId
      );
      const updatedTickets = [...currTickets];
      updatedTickets.splice(indexOfTicketToUpdate, 1, updatedTicket);
      dispatch({
        type: UPDATE_TICKET,
        updatedTickets,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong 😞");
    }
  };
};
 */