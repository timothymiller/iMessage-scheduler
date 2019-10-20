class Event {
    constructor(date, message, timeOfDay, type) {
    this.date = date;
    this.message = message;
    this.timeOfDay = timeOfDay; // for special timing based on events (9am - 9pm)
    // Morning (9am - 9:15am)
    // Noon (12:00pm - 12:15pm)
    // Evening (6:00pm - 7:00pm)
    // Midnight (12:00am exactly)
    this.type = type;
    // Types explained
    // associate
    // friend
    // family
    // immediate family
    // significant other
    }
}

export default Event;