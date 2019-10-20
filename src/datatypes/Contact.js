class Contact {
    constructor(name, phoneNumber, birthday, timeZone, type) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.birthday = birthday;
    this.timeZone = timeZone; // for special timing based on events
    this.type = type;
    // Types explained
    // associate
    // friend
    // family
    // immediate family
    // significant other
    }
}

export default Contact;