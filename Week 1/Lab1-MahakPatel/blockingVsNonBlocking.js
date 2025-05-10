// // BLOCKING CODE EXAMPLE
console.log("Start of blocking example");

// This function FREEZES the program for 3 seconds
function blockingOperation() {
    const start = Date.now();

    // This while loop acts like a traffic jam - nothing can get past
    while (Date.now() - start < 3000) {
        // Just killing time for 3 seconds (like a slow calculation)
    }
    console.log("Blocking operation completed after 3 seconds");
}

blockingOperation();

console.log("End of blocking example - this logs AFTER the blocking operation");

console.log("\n----------------------------------------\n");

// NON-BLOCKING CODE EXAMPLE

console.log("Start of non-blocking example");

// This doesn't block execution of subsequent code

setTimeout(() => {
    console.log("Non-blocking operation completed after 3 seconds");
}, 3000);

console.log("End of non-blocking example - this logs IMMEDIATELY, before the timeout completes");


/*
===========================================================================
Explanation:

- Blocking code: The while loop in blockingOperation() prevents any other code from executing until it completes.
  The thread is "blocked" and can't do anything else during this time. FO

- Non-blocking code: setTimeout() schedules the callback function to run after 3 seconds but immediately
  returns control to the program, allowing other code to execute while waiting. The event loop can process
  other events during the wait time.
===========================================================================
*/