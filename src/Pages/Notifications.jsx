import { useEffect, useContext } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Components/notificationsDB.js';
import { Layout } from '../Layout';
import UserBar from '../Pages/UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate.js';
import trash from '../Assets/trash.svg';
import '../Css/Notifications.css';

const Notifications = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const handleReadNotifications = async (e) => {
    e.preventDefault();
    let indice = +e.target.id;
    // console.log('leida: ', indice);
    await db.myNotifications.update(indice, { read: 'true' });
  };

  const notificaciones = useLiveQuery(async () => {
    return await db.myNotifications.orderBy('id').reverse().limit(8).toArray();
  });

  const unreadsNotifications = useLiveQuery(async () => {
    return await db.myNotifications.where('read').equals('false').count();
  });

  const deleteNotifications = (id) =>
    db.myNotifications.delete(id).then(() => {
      console.log('Notificacion eliminada con éxito');
    });

  const handleDeleteNotification = (e) => {
    e.preventDefault();
    let value = +e.target.id;
    deleteNotifications(value);
  };

  // console.log('NOTIS: ', notificaciones);
  // console.log('UNREAD: ', unreadsNotifications);

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
            {filtrarTraduccion(traduccionesBD, 'notifications', lenguage)} 📢{' '}
            {'('}
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
              <summary className="summaryNotifications">
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
              <span className="deleteIcon">
                <img
                  src={trash}
                  alt="trashCan"
                  id={notificacion.id}
                  onClick={handleDeleteNotification}
                ></img>
              </span>
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
