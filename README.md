# Interview Scheduler
Interview Scheduler is a user-friendly, single-page application that facilitates the booking and management of mentor interviews for students enrolled in the LightHouse Labs Web Development Bootcamp.

This React-based front-end application employs Express on the back-end, with PostgreSQL database support from the scheduler-api. Robust testing was performed using Jest and Cypress to ensure seamless functionality.

Interviews can be scheduled between noon and 5pm on any given day of the week. Upon loading the app, a request is sent to the API server, and any existing appointments for the chosen day are displayed. Switching to another day will reveal any previously booked appointments.

Overall, Interview Scheduler streamlines the interview booking process for both students and mentors, making it a valuable tool for the LightHouse Labs community.

## Booking Interview
Users of the Interview Scheduler app can create appointments by entering a student name and selecting an interviewer from a dropdown list. Once the details have been entered, clicking the 'Save' button triggers a save action. Before the request is sent to the server, a status indicator appears to keep the user informed that the app is processing their request.

Since the server request may take some time, it's important for users to know that their action is being processed. Once the server response is received, the status indicator disappears, and the updated appointment details are displayed.

!["Gif of booking an interview"](docs/Booking%20Interview.gif)

## Editing an Interview
With the editing feature, users can easily make changes to their appointments, providing them with greater flexibility and control over their interview schedule. Once the changes are saved, the updated details are automatically sent to the server, ensuring the appointment records are always up-to-date.

!["Gif of Editing an interview"](docs/Edit%20Interview.gif)

## Deleting Interview
In case a scheduled interview is no longer required, Interview Scheduler allows users to delete it. However, before proceeding with this destructive action, the app prompts the user to confirm their decision, ensuring that no appointments are accidentally deleted.
This confirmation ensures that the user can confidently manage their scheduled interviews without any fear of accidentally deleting an appointment or missing critical information related to their appointments.

!["Gif of Deleting an interview"](docs/Delete%20Interview.gif)

## Error Handling
If any errors occur while the server is processing the request, a user-friendly error message is displayed, alerting the user of the issue. The message can be easily dismissed by clicking on the 'Close' button provided.
![SS of Error message](docs/Error%20msg.png)

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
## Dependencies

- React
- Axios
- classnames
- normalize