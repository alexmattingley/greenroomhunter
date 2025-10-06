// Type definitions for location data
export interface BuoyData {
  [buoyName: string]: number;
}

export interface TideStation {
  id: number;
  location: string;
}

export interface WindLocation {
  name: string;
  lon: number;
  lat: number;
}

export interface LocationData {
  name: string;
  locationThumbImg: string;
  CDIP7DayBuoyStnNum: string;
  buoys: BuoyData;
  tideStation: TideStation;
  timeZone: string;
  lon: number;
  lat: number;
  windLocations: WindLocation[];
}

export interface LocationDataMap {
  [key: string]: LocationData;
}

// Buoy number to name mapping
export const buoyNumberToNameMap: Record<number, string> = {
  46218: "Harvest Buoy",
  46054: "West Santa Barbara Buoy",
  46222: "San Pedro Buoy",
  46224: "Oceanside Offshore Buoy",
  46221: "Santa Monica Bay Buoy",
  46258: "Mission Bay West Buoy",
  46232: "Point Loma South Buoy",
};

const locationData: LocationDataMap = {
  "santa-barbara": {
    name: "Santa Barbara",
    locationThumbImg: "/images/sandspit.jpg",
    CDIP7DayBuoyStnNum: "071",
    buoys: {
      "Harvest Buoy": 46218,
      "West Santa Barbara Buoy": 46054,
      "San Pedro Buoy": 46222,
    },
    tideStation: {
      id: 9411340,
      location: "Santa Barbara Harbor",
    },
    timeZone: "America/Los_Angeles",
    lon: -119.722445,
    lat: 34.4152593,
    windLocations: [
      {
        name: "Ventura",
        lon: -119.29272675,
        lat: 34.2802027,
      },
      {
        name: "Santa Barbara",
        lon: -119.722445,
        lat: 34.4152593,
      },
      {
        name: "Lompoc",
        lon: -120.5016415,
        lat: 34.510522,
      },
    ],
  },
  ventura: {
    name: "Ventura",
    locationThumbImg: "/images/little-rincon.jpg",
    CDIP7DayBuoyStnNum: "071",
    buoys: {
      "Harvest Buoy": 46218,
      "West Santa Barbara Buoy": 46054,
      "San Pedro Buoy": 46222,
    },
    tideStation: {
      id: 9411189,
      location: "Ventura Harbor",
    },
    timeZone: "America/Los_Angeles",
    lon: -119.3043655,
    lat: 34.2784187,
    windLocations: [
      {
        name: "Ventura",
        lon: -119.29272675,
        lat: 34.2802027,
      },
      {
        name: "Santa Barbara",
        lon: -119.722445,
        lat: 34.4152593,
      },
      {
        name: "Lompoc",
        lon: -120.5016415,
        lat: 34.510522,
      },
    ],
  },
  "los-angeles": {
    name: "Los Angeles",
    locationThumbImg: "/images/zuma.jpg",
    CDIP7DayBuoyStnNum: "092",
    buoys: {
      "Harvest Buoy": 46218,
      "West Santa Barbara Buoy": 46054,
      "Santa Monica Bay Buoy": 46221,
      "San Pedro Buoy": 46222,
    },
    tideStation: {
      id: 9410660,
      location: "Los Angeles Harbor",
    },
    timeZone: "America/Los_Angeles",
    lon: -118.4188725,
    lat: 33.9045641,
    windLocations: [
      {
        name: "Ventura",
        lon: -119.29272675,
        lat: 34.2802027,
      },
      {
        name: "Malibu",
        lon: -118.6801384,
        lat: 34.0362694,
      },
      {
        name: "El Porto",
        lon: -118.4188725,
        lat: 33.9045641,
      },
    ],
  },
  "orange-county": {
    name: "Orange County",
    locationThumbImg: "/images/lowers.jpg",
    CDIP7DayBuoyStnNum: "045",
    buoys: {
      "Harvest Buoy": 46218,
      "San Pedro Buoy": 46222,
      "Oceanside Offshore Buoy": 46224,
    },
    tideStation: {
      id: 9410580,
      location: "Newport Bay Entrance",
    },
    timeZone: "America/Los_Angeles",
    lon: -117.6026907,
    lat: 33.3853246,
    windLocations: [
      {
        name: "Ventura",
        lon: -119.29272675,
        lat: 34.2802027,
      },
      {
        name: "Malibu",
        lon: -118.6801384,
        lat: 34.0362694,
      },
      {
        name: "Huntington Beach",
        lon: -118.0815532,
        lat: 33.6931097,
      },
      {
        name: "Trestles",
        lon: -117.6026907,
        lat: 33.3853246,
      },
    ],
  },
  "san-diego": {
    name: "San Diego",
    locationThumbImg: "/images/jetty.jpg",
    CDIP7DayBuoyStnNum: "191",
    buoys: {
      "Harvest Buoy": 46218,
      "Oceanside Offshore Buoy": 46224,
      "Mission Bay West Buoy": 46258,
      "Point Loma South Buoy": 46232,
    },
    tideStation: {
      id: 9410170,
      location: "San Diego Bay",
    },
    timeZone: "America/Los_Angeles",
    lon: -117.2545644,
    lat: 32.8634499,
    windLocations: [
      {
        name: "Trestles",
        lon: -117.6026907,
        lat: 33.3853246,
      },
      {
        name: "Oceanside",
        lon: -117.388657,
        lat: 33.1930465,
      },
      {
        name: "Scripps",
        lon: -117.2545644,
        lat: 32.8634499,
      },
      {
        name: "Scripps",
        lon: -117.2545644,
        lat: 32.8634499,
      },
      {
        name: "Ocean Beach",
        lon: -117.2544431,
        lat: 32.7548141,
      },
    ],
  },
};

export default locationData;
