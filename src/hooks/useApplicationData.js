import axios from "axios";
import { useState, useEffect } from "react";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  ///Function to update the spots
  function updateSpots(state, appointments) {
    const dayObj = state.days.find((day) => day.name === state.day);
    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    const day = { ...dayObj, spots };
    const days = state.days.map((dayItem) =>
      dayItem.name === state.day ? day : dayItem
    );
    return days;
  }

  ///Function to book an interview

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments),
        });
      });
  }

  ///Function to delete an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments),
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
