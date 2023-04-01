export function getAppointmentsForDay(state, day) {
  const appointmentArr = state.days.filter(dayItem => dayItem.name === day);

  if (appointmentArr.length === 0) {
    return [];
  }

  const appointmentIds = appointmentArr[0].appointments;

  const appointments = appointmentIds.map(
    appointmentId => state.appointments[`${appointmentId}`]
  );

  return appointments;
}
export function getInterview(state, interview) {
if (!interview){
  return null
}
else {
  return {
    student: interview.student,
    interviewer : state.interviewers[interview.interviewer]
  }
}
}