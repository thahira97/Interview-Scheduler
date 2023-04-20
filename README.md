# Interview Scheduler
Interview Scheduler is a user-friendly, single-page application that facilitates the booking and management of mentor interviews for students enrolled in the LightHouse Labs Web Development Bootcamp.

This React-based front-end application employs Express on the back-end, with PostgreSQL database support from the scheduler-api. Robust testing was performed using Jest and Cypress to ensure seamless functionality.

Interviews can be scheduled between noon and 5pm on any given day of the week. Upon loading the app, a request is sent to the API server, and any existing appointments for the chosen day are displayed. Switching to another day will reveal any previously booked appointments.

Overall, Interview Scheduler streamlines the interview booking process for both students and mentors, making it a valuable tool for the LightHouse Labs community.
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
