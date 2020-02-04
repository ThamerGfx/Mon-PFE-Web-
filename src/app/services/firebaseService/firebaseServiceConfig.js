const prodConfig = {
    // apiKey           : "YOUR_API_KEY",
    // authDomain       : "your-app.firebaseapp.com",
    // databaseURL      : "https://your-app.firebaseio.com",
    // projectId        : "your-app",
    // storageBucket    : "your-app.appspot.com",
    // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
    
    apiKey: "AIzaSyCYDqeCQUhHTIJy0_70b9eKHuCpkINXsEY",
    authDomain: "aladinoo.firebaseapp.com",
    databaseURL: "https://aladinoo.firebaseio.com",
    projectId: "aladinoo",
    storageBucket: "aladinoo.appspot.com",
    messagingSenderId: "736881154753"
};

const devConfig = {
    // apiKey           : "YOUR_API_KEY",
    // authDomain       : "your-app.firebaseapp.com",
    // databaseURL      : "https://your-app.firebaseio.com",
    // projectId        : "your-app",
    // storageBucket    : "your-app.appspot.com",
    // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
    apiKey: "AIzaSyCYDqeCQUhHTIJy0_70b9eKHuCpkINXsEY",
    authDomain: "aladinoo.firebaseapp.com",
    databaseURL: "https://aladinoo.firebaseio.com",
    projectId: "aladinoo",
    storageBucket: "aladinoo.appspot.com",
    messagingSenderId: "736881154753"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
