## Six Pack
Six Pack is an adult beverage tracker that assigns exercise in exchange for each drink logged.
This app is for entertainment and informational purposes only. 
Consult a physician before performing this or any exercise program.

## Motivation
This is a Capstone project for [Ada Developers Academy](https://www.adadevelopersacademy.org/).  
The objective of this project was to build an original cross-platform app using React Native.
 
## Screenshots

![Home Screen](/pushup-app/assets/images/screenshots/mainscreen.png?raw=true =200x400)
![Exercise Details](/pushup-app/assets/images/screenshots/exercisescreen.png?raw=true)
![Settings Screen](/pushup-app/assets/images/screenshots/settingsscreen.png?raw=true)

## Tech/framework used
<b>Built with</b>
- [Expo](https://expo.io/)
- [React Native](https://facebook.github.io/react-native/)
- [Firebase](https://firebase.google.com/)
- [Facebook](https://developers.facebook.com/)
- [wger Workout Manager API](https://wger.de)

## Installation
* Clone this repository:
- git clone 
* Install dependencies:
- npm install
* Create a Facebook Developers Account
-
* Create a Firebase Realtime Database Storage Bucket
-
* Create a .env file in the main directory with the following information:

REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_STORAGE_BUCKET=

REACT_APP_IOS_CLIENT_ID=
REACT_APP_ANDROID_CLIENT_ID=

REACT_APP_FACEBOOK_APP_ID=
REACT_APP_FACEBOOK_APP_SECRET=

## How to use
* On the main/drinks screen, click on a drink icon to add it to your log.
* An assignment will pop up on the screen showing the drink type, time the drink was logged, and assigned exercise.
* Click on the name of an exercise to get more details/instructions.
* Click on the checkmark next to an assigned exercise to mark complete and dismiss it from your screen.
* Normal mode pulls from a fixed databased of exercises with accompanying instructional videos.
* Expert mode pulls from the wger Workout Manager Exercise Database API.  This is a wide range of user-generated exercise data, and some descriptions are better than others.  Expert mode allows filtering of exercises based on available equipment.

## Credits
- Beginner exercise data courtesy of [The CDC](https://www.cdc.gov/physicalactivity/basics/videos/index.htm)
- Expert exercise data courtesy of [wger Workout Manager](https://wger.de/en/)
- Icons made by [Freepik](http://www.freepik.com/) and [Roundicons](https://www.roundicons.com/) from [www.flaticon.com](https://www.flaticon.com/), licensed by [Creative Commons BY 3.0](https://www.roundicons.com/)
