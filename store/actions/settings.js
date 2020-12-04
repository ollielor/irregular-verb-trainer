export const SAVE_SETTINGS = 'SAVE_SETTINGS';

export const saveSettings = settings => {
   console.log('Settings in actions: ', settings)
   return {
      type: SAVE_SETTINGS,
      payload: {
         language: settings.language,
         level: settings.level
      }
   }
}