EN | [RU](https://github.com/zapupenec/diary_app/blob/master/README-ru.md)

# [Diary app](https://diary-app-self.vercel.app)
description

![screenshot](./image/screenshot.png)

Created based on a project from an educational internship in
<a href="https://preax.ru" target="_blank" rel="noreferrer">
  <img src="./image/icon/preax.svg" height="20" alt="HTML5" title="HTML5"/>
</a>

**Initial conditions**: stack 
<a href="https://developer.mozilla.org/en-US/docs/Glossary/html5" target="_blank" rel="noreferrer">
  <img src="./image/icon/html5.svg" width="20" height="20" alt="HTML5" title="HTML5"/>
</a>
<a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer">
  <img src="./image/icon/css3.svg" width="20" height="20" alt="CSS3" title="CSS3"/>
</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
  <img src="./image/icon/js.svg" width="20" height="20" alt="JavaScript" title="JavaScript"/>
</a>
<a href="https://react.dev" target="_blank" rel="noreferrer">
    <img src="./image/icon/react.svg" width="20" height="20" alt="webpack" title="webpack"/>
</a>
without additional libraries.

Added
<a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
  <img src="./image/icon/ts.svg" width="20" height="20" alt="webpack" title="webpack"/>
</a>
to the initial conditions for practice.

## Install for development
Developed using Node.js v20.4.0.

To work with the API, you need your secret key. Register at [unsplash.com](https://unsplash.com) and generate your key.

Clone the repository locally.
```
git clone https://github.com/zapupenec/diary_app.git
```
Install the dependencies.
```
make install
```
In the root folder, create a file ```.env``` and write down your key.
```
// contents of .env

REACT_APP_API_KEY = 'your-secret-api-key'
```
Runs the app in the development mode.
```
make start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Builds the app for production.
```
make build
```