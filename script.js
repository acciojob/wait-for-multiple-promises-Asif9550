//your JS code here. If required.
// Reference to the table body
const output = document.getElementById("output");

// Add initial loading row
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
output.appendChild(loadingRow);

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(index) {
  const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => resolve({ index, time }), time * 1000);
  });
}

// Create an array of promises
const promises = [createPromise(1), createPromise(2), createPromise(3)];

// Start timer to measure total resolution time
const startTime = performance.now();

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Calculate total time taken
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

  // Remove loading row
  output.innerHTML = "";

  // Populate table rows with resolved promise data
  results.forEach(({ index, time }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>Promise ${index}</td><td>${time}</td>`;
    output.appendChild(row);
  });

  // Add total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
  output.appendChild(totalRow);
});
