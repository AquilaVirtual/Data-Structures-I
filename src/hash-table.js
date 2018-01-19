/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  checkCapacity() {
    let fullSlots = 0;
    this.storage.each((bucket) => {
      if (bucket) fullSlots++;
    });
    return (fullSlots / this.limit) >= 0.75;
  }

  resize() {
    this.limit *= 2;
    const oldHashTable = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldHashTable.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    // grab the index associated with this key via the hash function
    const index = getIndexBelowMax(key.toString(), this.limit);
     // fetch whatever is stored at this index
    const tempBucket = this.storage.get(index);

    if (tempBucket === undefined) {
       // if bucket is undefined, we need to add a bucket there
      this.storage.set(index, [[key, value]]);
      return;
    }

     // we have a bucket at this index already
     // we want to check to see if the we're trying to insert is already in this bucket
    for (let i = 0; i < tempBucket.length; i++) {
       // check to see if any keys in the bucket match the key we want to insert
      if (tempBucket[i][0] === key) {
         // this means we have a duplicate key we're trying to insert
         // we need to overwrite the old value with the new value
        tempBucket[i][1] = value;
        this.storage.set(index, tempBucket);
        return;
      }
    }

     // the key we're trying to insert is unique
    tempBucket.push([key, value]);
    this.storage.set(index, tempBucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toSring(), this.limit);
    const bucket = this.storage.get(key);
    if (bucket !== undefined) {
      for (let i = 0; i < bucket.length; i++) {
        if (this.storage[i][0] === key);
        this.storage[i].splice(this.storage[i][0], 1);
        this.storage.set(index, bucket);
      }
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toSring(), this.limit);
    const bucket = this.storage.get(key);
    if (bucket !== undefined) {
      for (let i = 0; i < bucket.length; i++) {
        if (this.storage[i][0] === key);
        const getVal = this.storage[i][1];
        return getVal;
      }
      return;
    }
  }
}

module.exports = HashTable;
