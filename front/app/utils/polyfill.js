Object.defineProperty(Array.prototype, 'first', {
  enumerable: false,
  configurable: false,
  get: function() {
    return this[0];
  },
  set: function(value) {
    return this[0] = value;
  }
});

Object.defineProperty(Array.prototype, 'second', {
  enumerable: false,
  configurable: false,
  get: function() {
    return this[1];
  },
  set: function(value) {
    return this[1] = value;
  }
});

Object.defineProperty(Array.prototype, 'last', {
  enumerable: false,
  configurable: false,
  get: function() {
    return this[this.length - 1];
  },
  set: function(value) {
    return this[this.length - 1] = value;
  }
});

Object.defineProperty(Array.prototype, 'clean', {
  enumerable: false,
  configurable: false,
  value: function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {
        this.splice(i,1);
        i--;
      }
    }
    return this;
  }
});

if (![].includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    enumerable: false,
    configurable: false,
    value: function(searchElements) {
      if (searchElements instanceof String) {
        searchElements = [searchElements];
      }
      return searchElements.every(se => this.indexOf(se) > -1);
    }
  });
}
