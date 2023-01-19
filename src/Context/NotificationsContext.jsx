import { createContext, useState } from 'react';
import Pusher from 'pusher-js';

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
  // Enable pusher logging - don't include this in production
  var pusher = new Pusher('1c46a8cd6b365e0381ea', {
    cluster: 'us2',
  });
  // pusher.logToConsole = true;

  var channel = pusher.subscribe('notifications');
  channel.bind('send', function (data) {
    console.log(data);

    console.log('NOTIFICATIONS', data);
  });
  const data = { channel };

  return (
    <NotificationsContext.Provider value={data}>
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider };
export default NotificationsContext;
