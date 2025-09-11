import { spawn } from "child_process";
import path from "path";

export const predictDisease = (imageUrl) => {
  return new Promise((resolve, reject) => {
    

     const scriptPath = path.resolve(
      "E:/test/plant-Disease-Detection-System/Backend/app.py"
    );

    console.log("Resolved script path:", scriptPath);

    const process = spawn("py", ["-3.10", scriptPath, imageUrl]);


    let output = "";
    let error = "";

    // Handle stdout from Python
    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle stderr from Python
    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    // Handle process close
    process.on("close", (code) => {
      if (code !== 0) {
        console.error("Python Error:", error);
        return reject(new Error(error));
      }

      try {
        const result = JSON.parse(output); // Python must print valid JSON
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse Python output: ${err.message}\nOutput: ${output}`));
      }
    });
  });
};
