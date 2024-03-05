import { PushNotifications } from '@capacitor/push-notifications';

const addRegistrationListener = () => {
    return new Promise((resolve) => {
      PushNotifications.addListener('registration', (token) => {
        const registrationToken = token.value;
        resolve(registrationToken); 
      });
    });
  };


  export const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
    //alert(JSON.stringify(permStatus));
    
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      alert('User denied permissions!');
      return null; // Si les autorisations sont refusées, vous pouvez choisir de renvoyer null ou une autre valeur indiquant une erreur.
    }
  
    if (permStatus.receive === 'granted') {
      try {
        await PushNotifications.register();
        const registrationToken = await addRegistrationListener();
        return registrationToken;
      } catch (error) {
        alert('Error: ' + JSON.stringify(error));
        return null; 
      }
    }
  };
  
  
  export const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    alert('delivered notifications' + notificationList);
  }