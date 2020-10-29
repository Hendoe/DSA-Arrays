const Memory = require('./memory');
const memory = new Memory()

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  };

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  };

  pop() {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  };

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    console.log("print", memory.get(this.ptr + index));
    return memory.get(this.ptr + index);
  };

  urlify(string) {
    let returnString = "";
    for (let i = 0; i < string.length; i++) {
      if (string[i] === " ") {
        memory.set(this.ptr + this.length, '%20');
        returnString += '%20';
        this.length++;
      }
      else {
        memory.set(this.ptr + this.length, string[i]);
        returnString += string[i];
        this.length++;
      };
    };
    for (let i = 0; i < string.length; i++) {
      this.pop();
    };
    console.log(string);
    console.log(returnString);
    return returnString;
  };

  filter(filtering) {
    let filtered = [];
    for (let i = 0; i < filtering.length; i++) {
      if (filtering[i] < 5) {
        console.log(filtering[i], 'has been filtered')
      }
      else {
        memory.set(this.ptr + this.length, filtering[i]);
        filtered += filtering[i];
        console.log('setting', filtering[i]);
        this.length++;
      };
    };
    for (let j = 0; j < filtered.length - 1; j++) {
      console.log('getting', j)
      this.get(j);
    };
    console.log(filtered);
    return filtered;
  };

  max(toSum) {
    
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    };
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  };
};
Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;
  let arr = new Array();
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);
  // arr.pop();
  // arr.pop();
  // arr.pop();
  // arr.pop();
  // arr.pop();
  // arr.push('tauhida');
  // arr.get(0);

  // arr.urlify('jonas is my name');
  // arr.urlify('tauhida parveen');
  // arr.urlify('www.thinkful.com /tauh ida parv enn');

  // arr.filter([1, 3, 6, 8, 11]);

  console.log(arr);
};

main();
