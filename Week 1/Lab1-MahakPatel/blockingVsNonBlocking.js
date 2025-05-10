// Blocking code example
console.log("Start of blocking example");

// This blocks the execution of subsequent code
function blockingOperation() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Simulate a 3-second blocking operation
    }
    console.log("Blocking operation completed after 3 seconds");
}

blockingOperation();

console.log("End of blocking example - this logs AFTER the blocking operation");

console.log("\n----------------------------------------\n");

// Non-blocking code example
console.log("Start of non-blocking example");

// This doesn't block execution of subsequent code
setTimeout(() => {
    console.log("Non-blocking operation completed after 3 seconds");
}, 3000);

console.log("End of non-blocking example - this logs IMMEDIATELY, before the timeout completes");

/*
Explanation:
- Blocking code: The while loop in blockingOperation() prevents any other code from executing until it completes.
  The thread is "blocked" and can't do anything else during this time.

- Non-blocking code: setTimeout() schedules the callback function to run after 3 seconds but immediately
  returns control to the program, allowing other code to execute while waiting. The event loop can process
  other events during the wait time.
*/