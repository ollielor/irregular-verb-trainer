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
![Start Screen](https://drive.google.com/file/d/1S173Z2N1yKguOiNLQ5lRBAXmBdPRUT-6/view?usp=sharing)
Start Screen
![Browse and Learn](https://drive.google.com/file/d/1w-etdto_KHVjho23M_kW8f7ouQZ0JFyv/view?usp=sharing)
Browse and Learn
![Practise Meanings](https://drive.google.com/file/d/18t884ZsaSJ0y-oI_9M2bUAw7a1lo8bjM/view?usp=sharing)
Practise Meanings
![Start Screen](https://drive.google.com/file/d/1S173Z2N1yKguOiNLQ5lRBAXmBdPRUT-6/view?usp=sharing)


## Running the project
To run the project, use `npm install` and `expo start`.