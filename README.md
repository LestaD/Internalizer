# Internalizer

Simple web-app to make translations for your own project


## Install

With internalizer script _(not released)_:

```bash
npm i -g internalizer
cd to/your/projects
internalizer install
```

With git _(recommended)_:

```bash
cd to/your/projects
git clone https://github.com/LestaD/Internalizer.git
cd Internalizer
cp config.example.js config.js

# Dev tools
npm i -g jake roco nodemon

# Install dependencies
jake install
```


## Development

```bash
# Backend
jake api:dev

# Frontend
jake app:dev

# Open web-app
open http://localhost:5000
```


## Internalizer script

```bash
# Download and install Internalizer
internalizer install # <dirname>

# Upgrade Internalizer in dir
internalizer upgrade

# Install driver to create translations for Chrome Extensions
internalizer driver install chrome-extension

# Uninstall driver
internalizer driver uninstall yaml-simple
```


## Drivers

To install driver:

```bash
# Install npm package
npm i --save internalizer-driver-chrome-extension
```

Add plugin to `config.js`:

```js
{
  // ...
  "drivers": [
    "chrome-extension"
  ],
  "driverDefault": "chrome-extension"
}
```

With internalizer script it was easier:

```bash
internalizer driver install --default chrome-extension
```







