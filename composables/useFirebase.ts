import './useDirectApi';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken, isSupported } from "firebase/messaging";

export const useFirebase = () => {
  // Initialize Firebase
  // Firebase Console --> Settings --> General
  // --> Register App --> Copy firebaseConfig

  const firebaseConfig = {
    apiKey: 'AIzaSyDG8xAilCpnz7ImatiCXlCFGTmN74q33j4',
    authDomain: 'abber-328917.firebaseapp.com',
    projectId: 'abber-328917',
    storageBucket: 'abber-328917.appspot.com',
    messagingSenderId: '916666485232',
    appId: '1:916666485232:web:e87439d77d6cf1fc097535',
    measurementId: 'G-XHTTF5BP7L',
  };

  const app = initializeApp(firebaseConfig);

  // Firebase Messaging Service
  const messaging = getMessaging(app);


  async function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      // The API Endpoint will be explained at step 8

      try {
        const response = await useDirectApi('/alerts/devices/', {

          method: 'POST',
          body: JSON.stringify({
            registration_id: currentToken,
            type: 'web',
          }),
        })
        setTokenSentToServer(true);

      } catch (error) {
        setTokenSentToServer(false);
      }
    } else {
      console.log(
        "Token already sent to server so won't send it again " + 'unless it changes',
      );
    }
  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  function setTokenSentToServer(sent) {
    if (sent) {
      window.localStorage.setItem('sentToServer', '1');
    } else {
      window.localStorage.setItem('sentToServer', '0');
    }
  }

  function requestPermission() {
    Notification
      .requestPermission()
      .then(function () {
        console.log('Has permission!');
        resetUI();
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
  }

  function resetUI() {
    console.log('In reset ui');

    getToken(messaging, { vapidKey: "BJkqhs4bq8RLpNxpkkKsotYh1jbisY53gzTCaGSOLLaXKbda4GPR5aQ0BxO2dHQJyX6hbttdpv1XcFRRWZ_z1hM" })
      .then(function (currentToken) {
        console.log(currentToken);
        if (currentToken) {
          sendTokenToServer(currentToken);
        } else {
          setTokenSentToServer(false);
        }
      })
      .catch(function (err) {
        console.log(err);
        setTokenSentToServer(false);
      });
  }

  // messaging.onTokenRefresh(function () {
  //     getToken()
  //     .then(function (refreshedToken) {
  //       console.log('Token refreshed.');
  //       // Indicate that the new Instance ID token has not yet been sent to the
  //       // app server.
  //       setTokenSentToServer(false);
  //       // Send Instance ID token to app server.
  //       sendTokenToServer(refreshedToken);
  //       resetUI();
  //     })
  //     .catch(function (err) {
  //       console.log('Unable to retrieve refreshed token ', err);
  //     });
  // });

  onMessage(function (payload) {
    payload = payload.notification;

    // Create notification manually when user is focused on the tab
    const notificationTitle = payload.title;
    const notificationOptions = {
      body: payload.body,
      icon: payload.image,
    };

    if (!('Notification' in window)) {
      console.log('This browser does not support system notifications');
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      var notification = new Notification(notificationTitle, notificationOptions);
      notification.onclick = function (event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(payload.url, '_blank');
        notification.close();
      };
    }
  });

  // Checks if all required APIs exist in the browser.
  // const isSupported = () => 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window

  if (isSupported()) requestPermission();
  return ref()
}
