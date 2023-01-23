import { useEffect } from 'react';
import { Layout } from '../Layout';
import UserBar from '../Pages/UserBar';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Components/notificationsDB.js';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/Notifications.css';

const Notifications = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  const handleReadNotifications = async (e) => {
    e.preventDefault();
    let indice = +e.target.id;
    console.log('leida: ', indice);
    await db.myNotifications.update(indice, { read: 'true' });
  };

  const notificaciones = useLiveQuery(async () => {
    return await db.myNotifications.orderBy('id').reverse().limit(8).toArray();
  });

  const unreadsNotifications = useLiveQuery(async () => {
    return await db.myNotifications.where('read').equals('false').count();
  });

  console.log('NOTIS: ', notificaciones);
  console.log('UNREAD: ', unreadsNotifications);

  useEffect(() => {
    setPage('notifications');
  }, [setPage]);

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="notifications">
        <div className="notificationPageTitle">
          <h2>
            Notificaciones 📢 {'('}
            {unreadsNotifications}
            {')'}{' '}
          </h2>
        </div>
        <div className="notificationlist">
          {notificaciones?.map((notificacion) => (
            <details
              onToggle={handleReadNotifications}
              key={notificacion.id}
              id={notificacion.id}
              className={
                notificacion.read === 'false'
                  ? 'notificacionCard'
                  : 'notificacionCardLeida'
              }
            >
              <summary>
                <span className="notificationTitle">{notificacion.title}</span>
              </summary>
              <div className="divNotificationMessage">
                <h6
                  className={
                    notificacion.read === 'false' ? 'msg' : 'msg msgLeido'
                  }
                >
                  {notificacion.message}
                </h6>
              </div>
            </details>
          ))}
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
