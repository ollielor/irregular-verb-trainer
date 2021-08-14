# Irregular verb trainer

With this app, the user can practise irregular verbs in German and Swedish. The app has three modes: Browse and Learn, Practise Meanings and Practise Forms. 

At the moment, the app is fully functioning on iOS. On Android, it crashes on start. I've been able to narrow the problem down to React Navigation, but I haven't found the solution to this problem yet.

## The three modes
1. Browse and Learn: The user can see a list of irregular verbs, grouped by level (easy/intermediate/difficult).
2. Practise Meanings: The user chooses the correct meaning of three alternatives. There are between 5 and 10 questions depending on the level.
3. Practise Forms: The user writes the correct forms of an irregular verb. The user can select the tenses (infinitive / present / past / past perfect) to be practised in the settings.

## Other features
* All data is saved locally on the user's phone.
* The user can see their result history and share it by email or WhatsApp.
* The user can change their settings (language, level, tenses to be practised).

## Technologies and libraries
* React Native + Expo
* ExpoSQLite database
* Native Base UI library
* React Navigation
* Redux, React Redux and Redux Thunk
* Moment

## Screenshots
![Start Screen](https://www.ollieloranta.fi/screenshots/start_screen.PNG)
Start Screen
![Browse and Learn](https://www.ollieloranta.fi/screenshots/browse_verbs_screen.PNG)
Browse and Learn
![Practise Meanings](https://www.ollieloranta.fi/screenshots/meanings_mode.PNG)
Practise Meanings
![Practise Forms](https://www.ollieloranta.fi/screenshots/forms_mode.PNG)
Practise Forms
![Feedback on Exercises](https://www.ollieloranta.fi/screenshots/feedback.PNG)
Feedback on exercises
![Results View](https://www.ollieloranta.fi/screenshots/results_view.PNG)
Results view
![Share Results Screen](https://www.ollieloranta.fi/screenshots/share_results_screen.PNG)
Share Results Screen
![Settings Screen](https://www.ollieloranta.fi/screenshots/settings_screen.PNG)
Settings Screen
![Instructions Screen](https://www.ollieloranta.fi/screenshots/instructions.PNG)
Instructions Screen

## Running the project
To run the project, use `npm install` and `expo start`.