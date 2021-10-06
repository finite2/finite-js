import { createContext, useContext } from "react";

class ContextFactory {
  constructor() {
    this.contexts = new Map();
    this.contexts.set("", createContext({}));
  }

  addContext(name, defaultValue = {}) {
    if (!this.contexts.has(name)) {
      this.contexts.set(name, createContext(defaultValue));
    } else {
      console.error(`Context ${name} already exists`);
    }
  }

  addContextObject(name, context) {
    if (!this.contexts.has(name)) {
      this.contexts.set(name, context);
      console.info(`%cAdded context: ${name}`, `background: #ccffcc; color: black;`);
    } else {
      console.error(`Context ${name} already exists`);
    }
  }

  useContext(name) {
    return () => useContext(this.getContext(name));
  }

  getContext(name) {
    return this.contexts.get(name) || this.contexts.get("");
  }
}

export default ContextFactory;

export const contextFactory = new ContextFactory();
