/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the queue is storing
  3. Add an `enqueue` method that accepts an item as input and adds it to the storage structure
  4. Add a `dequeue` method that removes the item in the queue that was added earliest
*/
class Queue {
  constructor() {
    this.storage = [];
    this.counter = 0;
  }

  get size() {
    return this.counter;
  }
  enqueue(item) {
    const i = this.counter;
    this.storage[i] = item;
    this.counter++;
    return this.counter;
  }
  dequeue() {
    const i = this.counter;
    if (i === 0) return null;
    const dequeued = this.storage[i - 1];
    this.storage[i - 1] = null;
    this.counter--;
    return dequeued;
  }
}

module.exports = Queue;
