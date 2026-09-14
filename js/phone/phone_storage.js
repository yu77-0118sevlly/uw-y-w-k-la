export const storage = {
  config: () => JSON.parse(localStorage.getItem('luma-phone') || '{"phoneData":{},"phoneAppPrompts":{}}'),
  save(config) { localStorage.setItem('luma-phone', JSON.stringify(config)); },
  appData(contactId, appId) { return this.config().phoneData?.[contactId]?.[appId] || { items: [] }; },
  setAppData(contactId, appId, data) { const config = this.config(); config.phoneData ||= {}; config.phoneData[contactId] ||= {}; config.phoneData[contactId][appId] = data; this.save(config); },
  prompt(appId) { return this.config().phoneAppPrompts?.[appId]; },
  setPrompt(appId, prompt) { const config = this.config(); config.phoneAppPrompts ||= {}; config.phoneAppPrompts[appId] = prompt; this.save(config); }
};
