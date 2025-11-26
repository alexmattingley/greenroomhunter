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
interface AllBand {
  period: number;
  height: number;
  direction: string;
}

interface AllBandData {
  buoyNumber: BuoyNumber;
  timestamp: TimeStamp;
  allBands: AllBand[];
  error?: {
    statusText: string;
    status: number;
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
      throw {
        statusText: res.statusText,
        status: res.status,
      };
    }

    const indivAllBandData = await res.json();
    return indivAllBandData;
  } catch (error) {
    const buoyNumber = context?.params?.id || "";
    const errorObject = {
      buoyNumber,
      allBands: [],
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
        errorMessage: error.statusText,
        errorStatus: error.status,
      },
    };
  }
  const cleanAllBandArray = allBands.filter((band) => {
    const { period, height } = band;
    const superLongPeriodNoise = period > 20 && height < 0.5;
    return period >= 4 && !superLongPeriodNoise;
  });

  return {
    props: { buoyNumber, allBandData: cleanAllBandArray, timestamp },
  };
}

export const BuoyContext = createContext(null);

const DetailedbuoyData = (props: {
  buoyNumber: BuoyNumber;
  allBandData: AllBand;
  timestamp: TimeStamp;
  errorStatus?: number;
  errorMessage?: string;
}) => {
  const { buoyNumber, allBandData, timestamp, errorStatus, errorMessage } =
    props;
  const buoyName = buoyNumberToNameMap?.[buoyNumber] || buoyNumber;
  return (
    <BuoyContext.Provider
      value={{ buoyName, allBandData, timestamp, errorStatus, errorMessage }}
    >
      <BuoyPage />
    </BuoyContext.Provider>
  );
};

export default DetailedbuoyData;
