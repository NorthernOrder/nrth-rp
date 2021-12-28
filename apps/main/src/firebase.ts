import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBmPZwPK-CJOV3kJ2_elyBI050yBRQZRf4',
  authDomain: 'nrth-rp.firebaseapp.com',
  projectId: 'nrth-rp',
  storageBucket: 'nrth-rp.appspot.com',
  messagingSenderId: '90929503487',
  appId: '1:90929503487:web:86d289c276b31950dac0ca',
};

export const firebase = initializeApp(firebaseConfig);

export default firebase;
