/**
 * Test suite for buoyBreakDown.js functions
 * Tests dataSpec function with mock data from NOAA
 */

// Import the functions we need to test
import { dataSpec } from "./buoyBreakdown.js";
import {
  mockSpectrumDataInput,
  mockSpectrumResult,
} from "@/lib/testMocks/noaaSpectrumMock.ts";

describe("Buoy Data Processing Functions", () => {
  let dataSpecData, swdirData, swdir2Data;
  const dataSpecExpectedResult = mockSpectrumResult["data_spec"];
  const swdirExpectedResult = mockSpectrumResult["swdir"];
  const swdir2ExpectedResult = mockSpectrumResult["swdir2"];

  beforeAll(() => {
    // Get mock data for all three data types and extract the second line (like httpDataSpec does)
    const dataSpecFull = mockSpectrumDataInput("data_spec");
    const swdirFull = mockSpectrumDataInput("swdir");
    const swdir2Full = mockSpectrumDataInput("swdir2");

    // Extract the second line (index 1) to simulate what httpDataSpec returns
    dataSpecData = dataSpecFull.split("\n")[1];
    swdirData = swdirFull.split("\n")[1];
    swdir2Data = swdir2Full.split("\n")[1];
  });

  describe("Testing with data_spec (energy spectrum data)", () => {
    test("should parse data_spec", () => {
      const buoyBreakdownResult = dataSpec(dataSpecData);

      // Both should produce arrays of the same length
      expect(buoyBreakdownResult.length).toBe(dataSpecExpectedResult.length);

      // Validate each spectrum object structure
      buoyBreakdownResult.forEach((spectrum, index) => {
        expect(spectrum).toHaveProperty("energy");
        expect(spectrum).toHaveProperty("frequency");
        expect(spectrum).toHaveProperty("bandwidth");

        expect(typeof spectrum.energy).toBe("number");
        expect(typeof spectrum.frequency).toBe("number");
        expect(typeof spectrum.bandwidth).toBe("number");

        // First element should have bandwidth of 0.005
        if (index === 0) {
          expect(spectrum.bandwidth).toBe(0.005);
        }
      });
    });

    test("should produce equivalent results for data_spec", () => {
      const buoyBreakdownResult = dataSpec(dataSpecData);

      // Compare each spectrum point
      for (let i = 0; i < buoyBreakdownResult.length; i++) {
        // Energy should be exactly the same
        expect(buoyBreakdownResult[i].energy).toBe(
          dataSpecExpectedResult[i].energy
        );

        // Frequency should be exactly the same
        expect(buoyBreakdownResult[i].frequency).toBe(
          dataSpecExpectedResult[i].frequency
        );

        // Bandwidth should be exactly the same (within floating point precision)
        expect(
          Math.abs(
            buoyBreakdownResult[i].bandwidth -
              dataSpecExpectedResult[i].bandwidth
          )
        ).toBeLessThan(0.0001);
      }
    });
  });

  describe("Testing with swdir (mean wave direction data)", () => {
    test("should parse swdir", () => {
      const buoyBreakdownResult = dataSpec(swdirData);

      // Both should produce arrays of the same length
      expect(buoyBreakdownResult.length).toBe(swdirExpectedResult.length);

      // Validate each spectrum object structure
      buoyBreakdownResult.forEach((spectrum, index) => {
        expect(spectrum).toHaveProperty("energy");
        expect(spectrum).toHaveProperty("frequency");
        expect(spectrum).toHaveProperty("bandwidth");

        expect(typeof spectrum.energy).toBe("number");
        expect(typeof spectrum.frequency).toBe("number");
        expect(typeof spectrum.bandwidth).toBe("number");

        // First element should have bandwidth of 0.005
        if (index === 0) {
          expect(spectrum.bandwidth).toBe(0.005);
        }
      });
    });

    test("should produce equivalent results for swdir", () => {
      const buoyBreakdownResult = dataSpec(swdirData);

      // Compare each spectrum point
      for (let i = 0; i < buoyBreakdownResult.length; i++) {
        // Energy should be exactly the same
        expect(buoyBreakdownResult[i].energy).toBe(
          swdirExpectedResult[i].energy
        );

        // Frequency should be exactly the same
        expect(buoyBreakdownResult[i].frequency).toBe(
          swdirExpectedResult[i].frequency
        );

        // Bandwidth should be exactly the same (within floating point precision)
        expect(
          Math.abs(
            buoyBreakdownResult[i].bandwidth - swdirExpectedResult[i].bandwidth
          )
        ).toBeLessThan(0.0001);
      }
    });
  });

  describe("Testing with swdir2 (peak wave direction data)", () => {
    test("should parse swdir2", () => {
      const buoyBreakdownResult = dataSpec(swdir2Data);

      // Both should produce arrays of the same length
      expect(buoyBreakdownResult.length).toBe(swdir2ExpectedResult.length);

      // Validate each spectrum object structure
      buoyBreakdownResult.forEach((spectrum, index) => {
        expect(spectrum).toHaveProperty("energy");
        expect(spectrum).toHaveProperty("frequency");
        expect(spectrum).toHaveProperty("bandwidth");

        expect(typeof spectrum.energy).toBe("number");
        expect(typeof spectrum.frequency).toBe("number");
        expect(typeof spectrum.bandwidth).toBe("number");

        // First element should have bandwidth of 0.005
        if (index === 0) {
          expect(spectrum.bandwidth).toBe(0.005);
        }
      });
    });

    test("should produce equivalent results for swdir2", () => {
      const buoyBreakdownResult = dataSpec(swdir2Data);

      // Compare each spectrum point
      for (let i = 0; i < buoyBreakdownResult.length; i++) {
        // Energy should be exactly the same
        expect(buoyBreakdownResult[i].energy).toBe(
          swdir2ExpectedResult[i].energy
        );

        // Frequency should be exactly the same
        expect(buoyBreakdownResult[i].frequency).toBe(
          swdir2ExpectedResult[i].frequency
        );

        // Bandwidth should be exactly the same (within floating point precision)
        expect(
          Math.abs(
            buoyBreakdownResult[i].bandwidth - swdir2ExpectedResult[i].bandwidth
          )
        ).toBeLessThan(0.0001);
      }
    });
  });

  describe("Cross-data type validation", () => {
    test("should handle bandwidth transitions correctly across all data types", () => {
      const dataTypes = [
        {
          name: "data_spec",
          data: dataSpecData,
          expected: dataSpecExpectedResult,
        },
        { name: "swdir", data: swdirData, expected: swdirExpectedResult },
        { name: "swdir2", data: swdir2Data, expected: swdir2ExpectedResult },
      ];

      dataTypes.forEach(({ name, data, expected }) => {
        const buoyBreakdownResult = dataSpec(data);

        // Check specific bandwidth transition points
        for (let i = 1; i < buoyBreakdownResult.length; i++) {
          const resultBandwidth = buoyBreakdownResult[i].bandwidth;
          const expectedBandwidth = expected[i].bandwidth;

          // Check for the specific bandwidth adjustments mentioned in the code
          if (resultBandwidth === 0.0075 || resultBandwidth === 0.015) {
            expect(expectedBandwidth).toBe(resultBandwidth);
          }
        }
      });
    });

    test("should maintain data integrity across all data types", () => {
      const dataTypes = [
        {
          name: "data_spec",
          data: dataSpecData,
          expected: dataSpecExpectedResult,
        },
        { name: "swdir", data: swdirData, expected: swdirExpectedResult },
        { name: "swdir2", data: swdir2Data, expected: swdir2ExpectedResult },
      ];

      dataTypes.forEach(({ name, data, expected }) => {
        const buoyBreakdownResult = dataSpec(data);

        // Calculate total energy for both results
        const resultTotalEnergy = buoyBreakdownResult.reduce(
          (sum, s) => sum + s.energy * s.bandwidth,
          0
        );
        const expectedTotalEnergy = expected.reduce(
          (sum, s) => sum + s.energy * s.bandwidth,
          0
        );

        // Total energy should be very close (within floating point precision)
        expect(Math.abs(resultTotalEnergy - expectedTotalEnergy)).toBeLessThan(
          0.0001
        );
      });
    });
  });
});
