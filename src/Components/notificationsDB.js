import Pusher from 'pusher-js';
import Dexie from 'dexie';

var pusher = new Pusher('1c46a8cd6b365e0381ea', {
  cluster: 'us2',
});
pusher.logToConsole = true;
var channel = pusher.subscribe('notifications');

const db = new Dexie('myNotifications');

db.version(1).stores({
  myNotifications: '++id, title, message, read',
});

channel.bind('send', async function (data) {
  // alert(JSON.stringify(data));
  // const read = 'false';
  try {
    // Add the new friend!
    await db.myNotifications.add({
      title: data.title,
      message: data.message,
      read: 'false',
    });
  } catch (error) {
    console.log(`Failed to add ${data.title}: ${error}`);
  }
});

export { db, channel };
