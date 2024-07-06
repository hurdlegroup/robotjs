/*jshint esversion: 6 */
const { spawn } = require('child_process');
const { EventEmitter } = require('events');
const { join } = require('path');
const electron = require('electron');

class TargetPractice extends EventEmitter {
  elements = null;
  #browserWindow = null;

  start() {
    this.#browserWindow = spawn(electron, [join(__dirname, 'browser', 'main.js')],
      {
        detached: true,
        stdio: [null, null, null, 'ipc']
      });

    this.#browserWindow.on('message', (message) => {
      const data = message.data;

      switch (message.type) {
        case 'ready':
          this.elements = data;
          this.emit('ready');
          break;
        case 'event':
          this.emit(data.type, data);
          break;
      }
    });
  }

  stop() {
    this.elements = null;

    if (this.#browserWindow) {
      this.#browserWindow.kill();
      this.#browserWindow = undefined;
    }
  }
}

module.exports = new TargetPractice();
