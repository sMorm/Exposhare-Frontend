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

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}