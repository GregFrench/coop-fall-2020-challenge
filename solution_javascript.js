class EventSourcer {
  constructor() {
    this.value = 0;
    this.operations = [];
  }

  add(num) {
    this.value += num;

    this.operations.push({
      'add': num,
      'undo': false
    });
  }

  subtract(num) {
    this.value -= num;

    this.operations.push({
      'subtract': num,
      'undo': false
    });
  }

  undo() {
    let i = this.operations.length - 1;
    let success = false;

    while (success === false && i >= 0) {
      let obj = this.operations[i];

      if (obj.undo === false) {
        if (obj.hasOwnProperty('add')) {
          this.value -= obj.add;

          obj.undo = true;
          success = true;
        } else if (obj.hasOwnProperty('subtract')) {
          this.value += obj.subtract;

          obj.undo = true;
          success = true;
        }
      }

      i--;
    }
  }

  redo() {
    let i = this.operations.length - 1;
    let success = false;

    while (success === false && i >= 0) {
      let obj = this.operations[i];

      if (obj.undo === true) {
        if (obj.hasOwnProperty('add')) {
          this.value += obj.add;

          obj.undo = false;
          success = true;
        } else if (obj.hasOwnProperty('subtract')) {
          this.value -= obj.subtract;

          obj.undo = false;
          success = true;
        }
      }

      i--;
    }
  }

  bulk_undo(num) {
    let i = this.operations.length - 1;
    let count = 0;

    while (count < num && i >= 0) {
      this.undo();

      count++;
      i--;
    }
  }

  bulk_redo(num) {
    let i = this.operations.length - 1;
    let count = 0;

    while (count < num && i >= 0) {
      this.redo();

      count++;
      i--;
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
