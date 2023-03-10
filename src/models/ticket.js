import moment from "moment";
import "moment/locale/en-gb";

const formatToSentenceCase = (text) =>
  text.split("")[0].toUpperCase() + text.slice(1);

class Ticket {
  constructor(
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
  ) {
    this.ticketId = ticketId;
    this.departure = departure;
    this.departureDate = departureDate;
    this.departureTime = departureTime;
    this.destination = destination;
    this.noOfAdultEconomyTickets = noOfAdultEconomyTickets;
    this.noOfAdultFirstClassTickets = noOfAdultFirstClassTickets;
    this.noOfChildEconomyTickets = noOfChildEconomyTickets;
    this.noOfChildFirstClassTickets = noOfChildFirstClassTickets;
    this.payerEmail = payerEmail;
    this.payerPhone = payerPhone;
    this.totalFare = totalFare;
    this.trainRoute = trainRoute;
    this.trainType = trainType;
    this.passengerName = passengerName;
  }

  get readableDate() {
    //moment.locale('en-gb');         // en-gb
    return moment(this.departureDate).format("L, h:mm a");
  }

  get longDate() {
    return moment(this.departureDate).format("MMMM Do YYYY, h:mm:ss a");
  }
}

export default Ticket;
