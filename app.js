
const appcontainer = document.querySelector('.appcontainer');
const textinput = document.querySelector('.textinput');
const titleinput = document.querySelector('.titleinput');
const addbtn = document.querySelector('.addbtn');
const deletebtn = document.querySelector('.deletebtn');
const emptynote = document.querySelector('.emptynote');

let noteid = 1;
// Create/ Add
addbtn.addEventListener('click', () => {
  if (textinput.value) {
    let notescontainer = document.querySelector('.notescontainer');
    if (notescontainer == null) {
      notescontainer = document.createElement('div');

      notescontainer.classList.add('row', 'mx-4', 'pt-3', 'notescontainer');
    }

    notescontainer.innerHTML += `
                  <div class="col-sm-4 mb-4">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">${titleinput.value}</h5>
                              <p class="card-text">${textinput.value}
                              </p>
                              <button class="btn btn-danger deletebtn" onclick="deleteNote(event)">Delete</button>&nbsp;
                              <button class="btn btn-warning updatebtn" onclick="updateNote(event)">Edit</button>
                          </div>
                      </div>
                  </div>
    `;
    emptynote.setAttribute('style', 'display: none');
    appcontainer.appendChild(notescontainer);
    noteid++;
    titleinput.value = '';
    textinput.value = '';
  } else {
    alert('Empty Input Box !!!');
  }
});

// Delete
function deleteNote(e) {

  let parent = e.target.parentElement.parentElement.parentElement.parentElement;
  let child = e.target.parentElement.parentElement.parentElement;
  if (parent.children.length == 1) {
    let mainparent = parent.parentElement;
    // mainParent is appcontainer
    mainparent.removeChild(parent);
    emptynote.setAttribute('style', 'display: block');
  } else {
    parent.removeChild(child);
  }
}

// Edit / Update
let updateid = false;
function updateNote(e) {
  let paraElem = e.target.previousElementSibling.previousElementSibling;
  let titleElem = paraElem.previousElementSibling;
  if (!updateid) {
    let titleElemContent = titleElem.textContent;
    let paraElemContent = paraElem.textContent;
    titleinput.value = titleElemContent;
    textinput.value = paraElemContent;
    e.target.innerHTML = 'Update';
    // disable add button
    addbtn.setAttribute('disabled', true);
    updateid = true;
  } else {
    titleElem.innerHTML = titleinput.value;
    paraElem.innerHTML = textinput.value;
    e.target.innerHTML = 'Edit';
    textinput.value = '';
    titleinput.value = '';
    addbtn.removeAttribute('disabled');
    updateid = false;
  }
}
