'use-strict';

import imessage from 'osa-imessage';
import schedule from 'node-schedule';
import fs from 'fs';
import Contact from './datatypes/Contact';
import Event from './datatypes/Event';
import moment from 'moment-timezone';

// Send iMessage safely
const sendMessage = (phoneNumber, message) => {
    try {
        imessage.send(phoneNumber, message)
    } catch(e) {
        console.log("No conversation in message history found for phone number " + phoneNumber);
    }
}

const sendMessageToName = (name, message) => {
    console.log("Sent message to " + name + " " + message);
    try {
        imessage.handleForName(name).then(handle => {
            imessage.send(handle, message)
        })
    } catch(e) {
        console.log("No conversation in message history found for " + name);
    }
}

const generateSendTime = (timeOfDay) => {
    const second = Math.floor(Math.random() * 60);
    let minute = 0;
    switch(timeOfDay) {
        case 'morning':
            minute = Math.floor(Math.random() * 16);
            return "09:" + ('0' + minute).slice(-2) + ":" + ('0' + second).slice(-2);
        case 'noon':
            minute = Math.floor(Math.random() * 16);
            return "12:" + ('0' + minute).slice(-2) + ":" + ('0' + second).slice(-2);
        case 'evening':
            minute = Math.floor(Math.random() * 60);
            return "6:" + ('0' + minute).slice(-2) + ":" + ('0' + second).slice(-2);
        case 'midnight':
            return '00:00:00';
    }
}

const registerReceiver = () => {
    imessage.listen().on('message', (msg) => {
        if (!msg.fromMe) console.log(`'${msg.text}' from ${msg.handle}`)
    })
}

const scheduleMessage = (date, message, name) => {
    schedule.scheduleJob(date, () => { sendMessageToName(name, message) });
}

const generateRecurrenceRule = (date, contactTimeZone) => {
    const localEventTime = convertTZ(date, contactTimeZone);
    let rule = new schedule.RecurrenceRule();
    rule.month = Number(localEventTime.format('MM'));
    rule.date = Number(localEventTime.format('DD'));
    rule.hour = Number(localEventTime.format('HH'));
    rule.minute = Number(localEventTime.format('mm'));
    rule.second = Number(localEventTime.format('ss'));
    return rule;

}

const convertTZ = (date, contactTimeZone) => {
    const localTimeZone = moment.tz.guess();
    const offset = moment(date).tz(contactTimeZone).format('Z');
    const contactEventTime = moment.tz(date + offset, contactTimeZone);
    const localEventTime = contactEventTime.clone().tz(localTimeZone);
    return localEventTime;
}

const main = function() {

    registerReceiver();

    // Read contacts.txt
    let contacts = [];
    let data = fs.readFileSync('data/contacts.txt', 'utf8');
    data.split("\n").map(line => {
        const fields = line.split(",");
        contacts.push(new Contact(fields[0], fields[1], fields[2], fields[3], fields[4]));
    })

    // Read events.txt
    let events = [];
    data = fs.readFileSync('data/events.txt', 'utf8');
    data.split("\n").map(line => {
        const fields = line.split(",");
        events.push(new Event(fields[0], fields[1], fields[2], fields[3]));
    })

    // Schedule birthdays
    contacts.forEach(contact => {
        const birthdayMessageTime = moment().year() + "-" + contact.birthday + " " + generateSendTime('morning');
        const rule = generateRecurrenceRule(birthdayMessageTime, contact.timeZone);
        scheduleMessage(rule, "Happy Birthday! 🎉🎂", contact.name);
    })

    // TODO non-recurring events
    // Thanksgiving
    // Easter
    // Memorial Day (last Monday in May)
    // Mother's Day
    // Father's Day

    events.forEach(event => {
        const matchingContacts = contacts.filter(contact => {
            switch(event.type) {
                case 'associate':
                    return true;
                case 'friend':
                    return contact.type == 'friend' || contact.type == 'significant other';
                case 'family':
                    return contact.type == 'family' || contact.type == 'immediate family' || contact.type == 'significant other';
                case 'immediate family':
                    return contact.type == 'immediate family' || contact.type == 'significant other';
                case 'significant other':
                    return contact.type == 'significant other';
            }
        });
        matchingContacts.forEach(contact => {
            // schedule per contact time zone
            let sendDate = date + " " + generateSendTime(event.timeOfDay);
            const rule = generateRecurrenceRule(sendDate, contact.timeZone);
            scheduleMessage(rule, event.message, contact.name);
        })

    })
}

main()