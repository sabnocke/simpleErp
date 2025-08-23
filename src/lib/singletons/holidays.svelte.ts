const api = import.meta.env.VITE_API_KEY;
const endpoint = "https://api.api-ninjas.com/v1/holidays?country=CZ"


async function fetchAndSaveData() {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {"X-API-Key": api}
    })
    if (!response.ok) {
      console.error(`Unable to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    await Bun.write("holidays.json", JSON.stringify(data, null, 2));
    console.log("Holidays saved successfully.");
  } catch (error) {
    console.error(error);
  }

  return;
}

interface SingleHoliday {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
}

const validTypes = ["NATIONAL_HOLIDAY", "OBSERVANCE", "CHRISTIAN", "SEASON"]