export function addEventHandlers(emitter, eventHandlers: {}) {
  for (let [key, eventHandler] of Object.entries(eventHandlers)) {
    emitter.on(key, eventHandler);
  }
}
