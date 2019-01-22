## Six Pack
Six Pack is an adult beverage tracker that assigns exercise in exchange for each drink logged.
This app is for entertainment and informational purposes only. 
Consult a physician before performing this or any exercise program.

## Motivation
This is a Capstone project for [Ada Developers Academy](https://www.adadevelopersacademy.org/).  
The objective of this project was to build an original Android/iOS app using React Native.
 
## Screenshots
* <b>Android:</b>     

![Login Screen](/pushup-app/assets/images/screenshots/intro0screenshot.png?raw=true) ![Intro Screen 1](/pushup-app/assets/images/screenshots/intro1screenshot.png?raw=true)  ![Intro Screen 2](/pushup-app/assets/images/screenshots/intro2screenshot.png?raw=true) ![Intro Screen 3](/pushup-app/assets/images/screenshots/intro3screenshot.png?raw=true) ![Intro Screen 4](/pushup-app/assets/images/screenshots/intro4screenshot.png?raw=true) 


* <b>iOS:</b>     

![Home Screen](/pushup-app/assets/images/screenshots/mainscreen.png?raw=true) &nbsp;&nbsp;  ![Exercise Details](/pushup-app/assets/images/screenshots/exercisescreen.png?raw=true) &nbsp;&nbsp;  ![Settings Screen](/pushup-app/assets/images/screenshots/settingsscreen.png?raw=true)

## Tech/framework used
<b>Built with:</b>
[Expo](https://expo.io/)

[React Native](https://facebook.github.io/react-native/)

[Firebase](https://firebase.google.com/)

[Facebook](https://developers.facebook.com/)

[wger Workout Manager API](https://wger.de)

## Installation
The App is hosted on Expo's servers.  You can interact with it at https://expo.io/@mystioreo/six-pack 

To download and edit this project:

* Clone this repository:
- git clone 
* Install dependencies:
- npm install
* Create a Facebook Developers Account
-
* Create a Firebase Realtime Database Storage Bucket
-
* Create a .env file in the main directory with the following information:
```
REACT_APP_API_KEY= "<YOUR-FIREBASE-API-KEY>"
REACT_APP_AUTH_DOMAIN= "<YOUR-PROJECT-ID>.firebaseapp.com"
REACT_APP_DATABASE_URL= "https://<YOUR-DATABASE-NAME>.firebaseio.com"
REACT_APP_STORAGE_BUCKET= "<YOUR-STORAGE-BUCKET>.appspot.com"

REACT_APP_FACEBOOK_APP_ID= "<YOUR-FACEBOOK-APP-ID>"
REACT_APP_FACEBOOK_APP_SECRET= "<YOUR-FACEBOOK-APP-SECRET>"
```

## Using the App
1. On the main/drinks screen, click on a drink icon to add it to your log.
2. An assignment will pop up on the screen showing the drink type, time the drink was logged, and assigned exercise.
3. Click on the name of an exercise to get more details/instructions.
4. Click on the checkmark next to an assigned exercise to mark complete and dismiss it from your screen.
5. Normal mode pulls from a fixed databased of exercises with accompanying instructional videos.
6. Expert mode pulls from the wger Workout Manager Exercise Database API.  This is a wide range of user-generated exercise data, and some descriptions are better than others.  Expert mode allows filtering of exercises based on available equipment.

## Credits
Beginner exercise data courtesy of [The CDC](https://www.cdc.gov/physicalactivity/basics/videos/index.htm)

Expert exercise data courtesy of [wger Workout Manager](https://wger.de/en/)

Icons made by [Freepik](http://www.freepik.com/) and [Roundicons](https://www.roundicons.com/) from [www.flaticon.com](https://www.flaticon.com/), licensed by [Creative Commons BY 3.0](https://www.roundicons.com/)
