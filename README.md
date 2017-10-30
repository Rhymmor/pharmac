# Pharmac

[![Build Status](https://travis-ci.org/Rhymmor/pharmac.svg?branch=master)](https://travis-ci.org/Rhymmor/pharmac)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6fd3fa75e9e14e38b66e6994f159ad48)](https://www.codacy.com/app/anatoly.belonog/pharmac?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Rhymmor/pharmac&amp;utm_campaign=Badge_Grade)
[![codebeat badge](https://codebeat.co/badges/5df22dff-4ac1-40b1-84f4-7ac06edfad40)](https://codebeat.co/projects/github-com-rhymmor-pharmac-master)
[![BCH compliance](https://bettercodehub.com/edge/badge/Rhymmor/pharmac?branch=master)](https://bettercodehub.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/rhymmor/pharmac/badge.svg)](https://snyk.io/test/github/rhymmor/pharmac)

> Design to handle [pharmacokinetic model](https://en.wikipedia.org/wiki/Pharmacokinetics) problems but can be useful for solving [direct](https://en.wikipedia.org/wiki/Cauchy_problem)/[inverse](https://en.wikipedia.org/wiki/Inverse_problem) problems for all types of mathematical models

## Demo

https://pharmac-app.herokuapp.com/

## Stack

- Backend
    * [Node.js](https://github.com/nodejs/node)
        * [Typescript](https://github.com/Microsoft/TypeScript)
        * [Babel](https://github.com/babel/babel) as transpiler
        * [Express](https://github.com/expressjs/express) as http server
        * [Webpack](https://github.com/webpack/webpack) as frontend bundler
    * Python 2.7 with [NumPy](http://www.numpy.org/), [SciPy](https://www.scipy.org/) for mathematics
- Frontend
    * [React](https://github.com/facebook/react)
    * [Redux](https://github.com/reactjs/redux) as state container
    * [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) as UI kit
    * [recharts](https://github.com/recharts/recharts) for plots
    * [SCSS](https://github.com/sass/sass) as CSS extension


## Local setup

### Requirements

* Python 2.7 (with libs from requirements.txt file)
* Node v6.x.x

### Building

- Install the dependencies with `npm install`
- Run in the development mode with `npm run dev` and go to `localhost:8080`
- For run in the production:
    * Bundle sources with `npm run compile`
    * Start with `npm start`
    * Open `localhost:5000` in the browser