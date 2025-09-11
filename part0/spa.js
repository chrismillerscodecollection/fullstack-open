// object to hold notes
var notes = []


/* This function redraws the notes on the SPA. It assumes that notes are already present on the screen */
var redrawNotes = function() {
   // create a ul element with attributes 'class' and 'notes'
  var ul = document.createElement('ul')
  ul.setAttribute('class', 'notes')
  
  // for each note in notes, create a new li and save it to the variable li
  notes.forEach(function (note) {
    var li = document.createElement('li')
    // append the new li to ul (created at the beginning of the function)
    ul.appendChild(li);
    // create a text node as a child to the li and populate it with the content of the note
    li.appendChild(document.createTextNode(note.content))
  })

  // get all the elements with an Id of 'notes' and store them notesElement
  var notesElement = document.getElementById("notes")
  // check if notesElement has any child nodes, so <ul> <li>...</li> </ul
  if (notesElement.hasChildNodes()) {
    // if there is a child node, remove the first one
    notesElement.removeChild(notesElement.childNodes[0]);
  }
  // append the ul to the notes element
  notesElement.appendChild(ul)
}

// new instance of the XMLHttpRequest class
var xhttp = new XMLHttpRequest()

// when the ready state changes
xhttp.onreadystatechange = function () {
  // if the message is truly complete and the message was received successfully
  if (this.readyState == 4 && this.status == 200) {
    // parse the JSON response and save it to 'notes'
    notes = JSON.parse(this.responseText)
    // redraw the notes part of the page
    redrawNotes()
  }
}

// get the data from the server
xhttp.open("GET", "/exampleapp/data.json", true)
// send the data back to the client
xhttp.send()


var sendToServer = function (note) {
  var xhttpForPost = new XMLHttpRequest()
  xhttpForPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      console.log(this.responseText)
    }
  }

  xhttpForPost.open("POST", '/exampleapp/new_note_spa', true)
  xhttpForPost.setRequestHeader("Content-type", "application/json")
  xhttpForPost.send(JSON.stringify(note));
}

window.onload = function (e) {
  var form = document.getElementById("notes_form")
  form.onsubmit = function (e) {
    e.preventDefault()

    var note = {
      content: e.target.elements[0].value,
      date: new Date()
    }

    notes.push(note)
    e.target.elements[0].value = ""
    redrawNotes()
    sendToServer(note)
  }
}