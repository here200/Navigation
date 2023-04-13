class Storage {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
    if (!value) throw new Error('must input a value')
    this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key) {
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }

  removeByKey(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const kyLocalStorage = new Storage()