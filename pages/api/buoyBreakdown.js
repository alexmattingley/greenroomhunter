// pages/api/buoyBreakdown.js
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default async function handler(req, res) {
  const { buoyNumber } = req.body;
  try {
    const { stdout, stderr } = await execAsync(
      `python3 pages/api/buoyBreakDown.py --json --buoy ${buoyNumber} --datatype nineBand`
    );

    // Check if Python script wrote to stderr (warnings, errors)
    if (stderr) {
      console.error("Python script stderr:", stderr);
      // You might want to return an error or just log it
    }

    const data = JSON.parse(stdout);
    return res.status(200).json(data);
  } catch (error) {
    // This catches execution errors (command not found, etc.)
    return res.status(500).json({ error: error.message });
  }
}
