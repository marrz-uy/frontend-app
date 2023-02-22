import Pusher from 'pusher-js';
import Dexie from 'dexie';
import Swal from 'sweetalert2';
import '../Css/Toast.css';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showCloseButton: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  // background: '#00499d',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

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
    let str = data.message;
    let shortStr = str.substring(0, 20);
    Toast.fire({
      // icon: 'success',
      title: data.title,
      text: ' ' + shortStr + '   ...',
      showClass: {
        popup: 'animate__animated animate__backInRight animate__slow',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__slower',
      },
    });
  } catch (error) {
    console.log(`Failed to add ${data.title}: ${error}`);
  }
});

export { db, channel };