/*jshint esversion: 6 */
var ipc = require('electron').ipcRenderer;
var typingTimer;

$(document).ready(function(){
  var elements = {};

  $("#fixture").children().each(function() {
    var el = $(this);

    elements[el.attr('id')] = {
      x: el[0].offsetLeft + (el[0].offsetWidth / 2),
      y: el[0].offsetTop + (el[0].offsetHeight / 2),
    }
  });

  hookEvents();
  setTimeout(() => {
    ipc.send('ready', elements);
  }, 1000);
});

function hookEvents() {
  $('#fixture button').on('click', (event) => {
    ipc.send('event', {
      id: event.target.id,
      type: 'click'
    });
  });

  $('#fixture button').on('mousedown', (event) => {
    ipc.send('event', {
      id: event.target.id,
      type: 'mousedown'
    });
  });

  $('#fixture button').on('mouseup', (event) => {
    ipc.send('event', {
      id: event.target.id,
      type: 'mouseup'
    });
  });

// Logic to send text when the "user" is finished typing.
  $('#fixture input').on('keydown', (event) => {
    clearTimeout(typingTimer);
  });

  $('#fixture input').on('keyup', (event) => {
    // They started typing again, clear the timer.
    clearTimeout(typingTimer);
    // Restart the timer!
    typingTimer = setTimeout(() => {
      // It's been enough time they're probably finished.
      if ($(event.target).val()) {
        ipc.send('event',
          {
            id: event.target.id,
            text: $(event.target).val(),
            type: 'type'
          });
      }
    }, 500);
  });

  $('#fixture textarea').on('scrollend', (event) => {
    ipc.send('event',
      {
        id: event.target.id,
        type: 'scroll',
        scroll_y: event.target.scrollTop,
        scroll_x: event.target.scrollLeft,
      });
  });
}
