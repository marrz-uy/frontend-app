import { createContext } from 'react';
import Pusher from 'pusher-js';
const NotificationsContext = createContext();

var pusher = new Pusher('1c46a8cd6b365e0381ea', {
  cluster: 'us2',
});
pusher.logToConsole = true;
var channel = pusher.subscribe('notifications');

const NotificationsProvider = ({ children }) => {
  const notifications = JSON.parse(localStorage?.getItem('notifications'));

  channel.bind('send', function (data) {
    const newNoti = { title: data.title, message: data.message, read: false };
    notifications.unshift(newNoti);
    if (notifications.length > 7) {
      notifications.pop();
    }
    localStorage.setItem('notifications', JSON.stringify(notifications));
    console.log('NOTIFICATIONS CONTEXT', notifications);
    // console.log('LENGTH', notifications.length);
    // console.log('new NOTIFICATIONS', newNoti);
  });

  const GetNotificationsFromLocalStorage = () => {
    return JSON.parse(localStorage?.getItem('notifications'));
  };

  function GetUnreadNotificationIndexes(notifications) {
    return notifications.filter(({ read }) => !read).map((index) => index);
  }

  /*  console.log(
    'NOTIFICACIONES SIN LEER: ',
    GetUnreadNotificationIndexes(GetNotificationsFromLocalStorage())
  ); */

  const dataExport = {
    notifications,
    GetNotificationsFromLocalStorage,
    GetUnreadNotificationIndexes,
  };

  return (
    <NotificationsContext.Provider value={dataExport}>
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider };
export default NotificationsContext;
