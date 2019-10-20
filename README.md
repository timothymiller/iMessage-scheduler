# :iphone: iMessage Scheduler

One of the last remaining features Android phones have which has no iOS equivalent is scheduled text messages. Samsung phones have this feature built into the stock texting app. While iOS 13 brings capabilities for scheduled automation, the Messages app remains secluded in the walled garden.

## :hamburger: Tech Stack

- Node.js
- Yarn
- ES6

## :wrench: How it works

Edit contacts.txt with one contact per line using the following csv format.

```plain text
full name,phone number,birthday eg. MM-DD,time zone eg. America/New_York,group name eg. associate
```

An example value would look like this

```plain text
chad brad,12345678901,01-15,America/New_York,associate
```

Edit events.txt with one event per line using the following csv format.

```plain text
event date eg. MM-DD,message,timeOfDay (see types in Events.js),target group name
```

An example value would look like this

```plain text
12-25,Merry Christmas! 🎄,morning,associate
```

## :running: Running

Instructions on running, including disabling SIP can be [found here](https://timknowsbest.com/free-imessage-scheduler)

## :construction: Roadmap

This scheduler currently supports recurring dates only. This does not support holidays like Thanksgiving, Easter, Memorial Day (last day in May), Mother's Day or Father's Day.
React frontend for scheduling messages from a web browser.

## :clap: Special Thanks

- [osa-imessage](https://www.npmjs.com/package/osa-imessage)
- [node-scheduler](https://github.com/node-schedule/node-schedule)

## Disclaimer

This open source project is an independent project and has not been authorized, sponsored, or otherwise approved by Apple Inc.

iMessage, iOS, Mac, El Capitan, and Apple are registered trademarks of Apple Inc.