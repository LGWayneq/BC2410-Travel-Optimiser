import requests
from fileWriter import append_to_csv
from serpapi import API_KEY

DEPARTURE_DATES = [
    "2024-05-01",
    "2024-05-02",
]
RETURN_DATES = [
    "2024-05-08",
]
DESTINATION_CITIES = [
    "NRT", # Tokyo
    "ICN", # Seoul
    "PEK", # Beijing
    "HKG", # Hong Kong
    "TPE", # Taipei
    "BKK", # Bangkok
    "KUL", # Kuala Lumpur
    "CGK", # Jakarta
    "MNL", # Manila
]

def format_url(departure_city, destination_city, departure_date):
    return f"https://serpapi.com/search.json?engine=google_flights&departure_id={departure_city}&arrival_id={destination_city}&outbound_date={departure_date}&currency=SGD&type=2&hl=en&api_key={API_KEY}"

def parse_flight(flight):
    return {
        "flights": flight["flights"] if "flights" in flight else None,
        "layovers" : flight["layovers"] if "layovers" in flight else None,
        "total_duration": flight["total_duration"]  if "total_duration" in flight else None,
        "carbon_emissions": flight["carbon_emissions"] if "carbon_emissions" in flight else None,
        "price": flight["price"] if "price" in flight else None,
        "type": flight["type"] if "type" in flight else None,
        "extensions": flight["extensions"] if "extensions" in flight else None,
    }

def scrape_flight_data(departure_city, destination_city, departure_date):
    url = format_url(departure_city, destination_city, departure_date)

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        all_flights = []
        for best_flight in data["best_flights"]:
            all_flights.append(parse_flight(best_flight))
        for other_flight in data["other_flights"]:
            all_flights.append(parse_flight(other_flight))
        return all_flights
    else:
        print("Failed to fetch data from Google Flights.")
        print(response.text)

def scrape_and_save_flights(departure_city, destination_city, departure_date, verbose = False):
    flights = scrape_flight_data(departure_city, destination_city, departure_date)
    filename = r'C:/Users/G Wayne/Desktop/BC2410/Demo/BC2410-Travel-Optimiser/scraper/flights.csv'
    append_to_csv(flights, filename)
    if verbose:
        print(flights)
        if flights:
            print(f"Flights Information for {destination_city}:")
            for flight in flights:
                print(flight)
        else:
            print(f"No flights found for {destination_city}.")

def start_flight_scraper():
    departure_city = "SIN"

    for departure_date in DEPARTURE_DATES:
        for destination_city in DESTINATION_CITIES:
            scrape_and_save_flights(departure_city, destination_city, departure_date)

    for return_date in RETURN_DATES:
        for destination_city in DESTINATION_CITIES:
            scrape_and_save_flights(destination_city, departure_city, return_date)

if __name__ == "__main__":
    start_flight_scraper()