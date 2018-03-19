//import ChatMessage from './chat-message.model';

export class Trip {
    $key?: String;
    from: String;
    fromTo: String;
    to: String;     
    maxPassengers:  Number;
    date: String;   
    driverId: String;   
    passengerIds: [String];
    messages:[any];
    passengerTrips: [String];
    driverTrips: [String];
}