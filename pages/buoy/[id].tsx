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
type NineBand =
  | {
      [key: string]: {
        height: number;
        direction: number;
      };
    }
  | Record<string, never>;

interface NineBandData {
  buoyNumber: BuoyNumber;
  timestamp: TimeStamp;
  nineBand: NineBand;
  error?: {
    message: string;
  };
}

const fetchIndivNineBandData = async (
  context: Context
): Promise<NineBandData> => {
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

    const indivNineBandData = await res.json();
    return indivNineBandData;
  } catch (error) {
    const buoyNumber = context?.params?.id || "";
    const errorObject = {
      buoyNumber,
      nineBand: {},
      timestamp: "",
      error,
    };
    console.error("Error fetching data:", error);
    return errorObject;
  }
};

export async function getServerSideProps(context: Context) {
  const indivNineBandData = await fetchIndivNineBandData(context);
  const { buoyNumber, nineBand, timestamp, error } = indivNineBandData;
  if (!!error) {
    return {
      props: {
        buoyNumber,
        nineBandData: nineBand,
        timestamp,
        error: error.message,
      },
    };
  }
  const nineBandReverseArray = Object.keys(nineBand)
    .reverse()
    .map((period) => {
      return {
        period,
        height: nineBand[period].height,
        direction: nineBand[period].direction,
      };
    });

  return {
    props: { buoyNumber, nineBandData: nineBandReverseArray, timestamp },
  };
}

export const BuoyContext = createContext(null);

const DetailedbuoyData = (props: {
  buoyNumber: BuoyNumber;
  nineBandData: NineBand;
  timestamp: TimeStamp;
  error?: string;
}) => {
  const { buoyNumber, nineBandData, timestamp, error = "" } = props;
  const buoyName = buoyNumberToNameMap?.[buoyNumber] || buoyNumber;
  return (
    <BuoyContext value={{ buoyName, nineBandData, timestamp, error }}>
      <BuoyPage />
    </BuoyContext>
  );
};

export default DetailedbuoyData;
