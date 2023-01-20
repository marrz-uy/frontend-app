import { createContext } from 'react';
import { channel } from '../Components/Notification';
const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
  const notifications = JSON.parse(localStorage?.getItem('notifications'));

  channel.bind('send', function (data) {
    const newNoti = { title: data.title, message: data.message, read: false };
    notifications.unshift(newNoti);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    // console.log('NOTIFICATIONS', notifications);
    console.log('new NOTIFICATIONS', newNoti);
  });

  const GetNotificationsFromLocSt = () => {
    return JSON.parse(localStorage?.getItem('notifications'));
  };

  function GetUnreadNotificationIndexes(notifications) {
    return notifications.filter(({ read }) => !read).map((index) => index);
  }

  console.log(
    'NOTIFICACIONES SIN LEER: ',
    GetUnreadNotificationIndexes(GetNotificationsFromLocSt())
  );

  const data = {
    channel,
    notifications,
    GetNotificationsFromLocSt,
    GetUnreadNotificationIndexes,
  };

  return (
    <NotificationsContext.Provider value={data}>
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider };
export default NotificationsContext;
