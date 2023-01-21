import { useEffect, useContext, useState } from 'react';
import { Layout } from '../Layout';
import NotificationsContext from '../Context/NotificationsContext';
import UserBar from '../Pages/UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/Notifications.css';

const Notifications = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  const {
    notifications,
    GetNotificationsFromLocalStorage,
    GetUnreadNotificationIndexes,
  } = useContext(NotificationsContext);

  const [allNotifications, setAllNotifications] = useState(notifications);

  const handleReadNotifications = (e) => {
    e.preventDefault();
    let indice = +e.target.id;

    console.log('leida: ', indice);
    console.log('notis: ', allNotifications);

    let updatedNotifications = allNotifications.map(function (
      notification,
      index
    ) {
      if (index === indice) {
        return { ...notification, read: true };
      }
      return notification;
    });
    console.log('NUEVO ARRAY NOTIFIC page', updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setAllNotifications(JSON.parse(localStorage?.getItem('notifications')));
  };

  useEffect(() => {
    setPage('notifications');
    setInterval(function () {
      let dataFromLocalStorage = localStorage?.getItem('notifications');
      setAllNotifications(JSON.parse(dataFromLocalStorage));
    }, 500);
    return (dataFromLocalStorage) => {
      dataFromLocalStorage = '';
    };
  }, [setPage]);

  // console.log('ALL NOTIS NOTIS: ', notifications);
  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="notifications">
        <div className="notificationTitle">
          <h1>Notificaciones feeluy</h1>
        </div>
        <div className="notificationlist">
          {allNotifications.map((item, index) => {
            return (
              <details
                onToggle={handleReadNotifications}
                key={index}
                id={index}
                className={
                  item.read === false
                    ? 'notificacionCard'
                    : 'notificacionCardLeida'
                }
              >
                <summary>
                  <span className="notificationTitle">{item.title}</span>
                </summary>
                <div className="divNotificationMessage">
                  <h6 className={item.read === false ? 'msg' : 'msgLeido'}>
                    {item.message}
                  </h6>
                </div>
              </details>
            );
          })}
        </div>
      </div>
      {userBar && (
        <UserBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserBar={setUserBar}
        />
      )}
    </Layout>
  );
};

export default Notifications;
