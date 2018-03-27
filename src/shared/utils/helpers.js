import moment from 'moment'

// Decide how to greet based on time of the day
export function getGreetingMessage(name) {
  const m = moment()
  
  if(!m || !m.isValid()) { return " " } //if we can't find a valid or filled moment, we return.
  
  const split_afternoon = 12 //24hr time to split the afternoon
  const split_evening = 17 //24hr time to split the evening
  const currentHour = parseFloat(m.format("HH"))
  
  if(currentHour >= split_afternoon && currentHour <= split_evening) {
    return "Afternoon " + name
  } else if(currentHour >= split_evening) {
    return "Good Evening " + name 
  } else {
    return "Good Morning " + name
  }
}