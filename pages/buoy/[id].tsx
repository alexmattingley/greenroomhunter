import { createContext } from "react";
import { buoyNumberToNameMap } from "data/location-data";
import BuoyPage from "components/BuoyPage";

interface Context {
  req: {
    headers: { host: string };
  };
  params: { id: string };
}

type BuoyNumber = string;
type TimeStamp = string;
type AllBand =
  | {
      [key: string]: {
        height: number;
        direction: number;
      };
    }
  | Record<string, never>;

interface AllBandData {
  buoyNumber: BuoyNumber;
  timestamp: TimeStamp;
  allBands: AllBand;
  error?: {
    message: string;
  };
}

const fetchIndivAllBandData = async (
  context: Context
): Promise<AllBandData> => {
  try {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = context?.req?.headers?.host || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;
    const buoyNumber = context?.params?.id;
    const fetchURL = `${baseUrl}/api/buoyBreakdown`;

    const res = await fetch(fetchURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buoyNumber }),
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const indivAllBandData = await res.json();
    return indivAllBandData;
  } catch (error) {
    const buoyNumber = context?.params?.id || "";
    const errorObject = {
      buoyNumber,
      allBands: {},
      timestamp: "",
      error,
    };
    console.error("Error fetching data:", error);
    return errorObject;
  }
};

export async function getServerSideProps(context: Context) {
  const indivAllBandData = await fetchIndivAllBandData(context);
  const { buoyNumber, allBands, timestamp, error } = indivAllBandData;
  if (!!error) {
    return {
      props: {
        buoyNumber,
        allBandData: allBands,
        timestamp,
        error: error.message,
      },
    };
  }
  const dataToParse = allBands;
  const cleanAllBandArray = Object.keys(dataToParse).reduce(
    (accumulator, period) => {
      const height = dataToParse[period].height;
      // Remove any bands that don't have more than a half a foot of swell
      // Remove any bands that are less than 4 seconds
      if (height > 0.5 && Number(period) >= 4) {
        accumulator.push({
          period,
          height: dataToParse[period].height,
          direction: dataToParse[period].direction,
        });
      }
      return accumulator;
    },
    []
  );

  return {
    props: { buoyNumber, allBandData: cleanAllBandArray, timestamp },
  };
}

export const BuoyContext = createContext(null);

const DetailedbuoyData = (props: {
  buoyNumber: BuoyNumber;
  allBandData: AllBand;
  timestamp: TimeStamp;
  error?: string;
}) => {
  const { buoyNumber, allBandData, timestamp, error = "" } = props;
  const buoyName = buoyNumberToNameMap?.[buoyNumber] || buoyNumber;
  return (
    <BuoyContext value={{ buoyName, allBandData, timestamp, error }}>
      <BuoyPage />
    </BuoyContext>
  );
};

export default DetailedbuoyData;
