import { buoyNumberToNameMap } from "data/location-data";
import BuoyPage from "components/BuoyPage";
import { createContext } from "react";

const fetchIndivNineBandData = async (context) => {
  try {
    // Get the base URL for the current environment
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = context?.req?.headers?.host || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;
    const buoyNumber = context.params.id;
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
    console.error("Error fetching data:", error);
    return {};
  }
};

export async function getServerSideProps(context) {
  const indivNineBandData = await fetchIndivNineBandData(context);
  const { buoyNumber, nineBand, timestamp } = indivNineBandData;
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

const DetailedbuoyData = (props) => {
  const { buoyNumber, nineBandData, timestamp } = props;
  const buoyName = buoyNumberToNameMap[buoyNumber];
  return (
    <BuoyContext value={{ buoyName, nineBandData, timestamp }}>
      <BuoyPage />
    </BuoyContext>
  );
};

export default DetailedbuoyData;
