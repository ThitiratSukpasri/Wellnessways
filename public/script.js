function setupFormListeners() {
  const bmiText = document.getElementById("bmi");
  const descText = document.getElementById("desc");
  const form = document.querySelector("form");

  form.addEventListener("submit", onFormSubmit);
  form.addEventListener("reset", onFormReset);

  function onFormReset() {
    const startTime = performance.now(); // Start profiling
    bmiText.textContent = 0;
    bmiText.className = "";
    descText.textContent = "N/A";
    const endTime = performance.now(); // End profiling
    console.log("Time taken by onFormReset:", endTime - startTime, "milliseconds");
  }

  function onFormSubmit(e) {
    const startTime = performance.now(); // Start profiling
    e.preventDefault();

    const weight = parseFloat(form.weight.value);
    const height = parseFloat(form.height.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert("Please enter a valid weight and height");
      return;
    }
    const heightInMeters = height / 100; // cm -> m
    const bmi = calculatebmi(heightInMeters, weight);
    const desc = interpretBMI(bmi);

    bmiText.textContent = bmi.toFixed(2);
    bmiText.className = desc;
    descText.innerHTML = `You are <strong>${desc}</strong>`;

    const endTime = performance.now(); // End profiling
    console.log("Time taken by onFormSubmit:", endTime - startTime, "milliseconds");
  }
}


function calculatebmi(height, weight) {
  const startTime = performance.now(); // Start profiling

  if (typeof height !== 'number' || typeof weight !== 'number') {
    throw new Error('Invalid input: Height and weight must be numbers');
  }
  if (height <= 0 || weight <= 0) {
    throw new Error('Invalid input: Height and weight must be positive numbers');
  }
  const endTime = performance.now(); // End profiling
    console.log("calculatebmi:", endTime - startTime, "milliseconds");
  return weight / Math.pow(height, 2);
}


function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}

module.exports ={interpretBMI,calculatebmi,setupFormListeners};

