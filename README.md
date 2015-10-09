# Internalizer

Simple web-app to make translations for your own project


## Install

With internalizer script:

```bash
npm i -g internalizer
cd to/your/projects
internalizer install
```

With git:

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



