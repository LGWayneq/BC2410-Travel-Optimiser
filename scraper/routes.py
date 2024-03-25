import requests
from fileWriter import append_to_csv
from serpapi import API_KEY

TRAVEL_MODES = [
    0,  # Driving
    3   # Transit
]

def format_url(travel_mode, start_coordinates, end_coordinates):
    return f"https://serpapi.com/search.json?engine=google_maps_directions&travel_mode={travel_mode}&start_coords={start_coordinates}&end_coords{end_coordinates}&distance_unit=0&hl=en&api_key={API_KEY}"

def scrape_route_data(travel_mode, start_coordinates, end_coordinates):
    url = format_url(travel_mode, start_coordinates, end_coordinates)

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        all_routes = []
        for property in data["directions"]:
            all_routes.append({
                "travel_mode": property["travel_mode"] if "travel_mode" in property else None,
                "via": property["via"] if "via" in property else None,
                "distance": property["distance"] if "distance" in property else None,
                "duration": property["duration"] if "duration" in property else None,
                "cost": property["cost"] if "cost" in property else None,
                "currency": property["currency"] if "currency" in property else None,
            })
        return all_routes
    else:
        print("Failed to fetch data from Google Maps.")
        print(response.text)

def scrape_and_save_routes(travel_mode, start_coordinates, verbose = False):
    routes = scrape_route_data(travel_mode, start_coordinates)
    filename = r'C:/Users/G Wayne/Desktop/BC2410/Demo/BC2410-Travel-Optimiser/scraper/routes.csv'
    append_to_csv(routes, filename)
    if verbose:
        print(routes)
        if routes:
            print(f"routes Information:")
            for route in routes:
                print(route)
        else:
            print(f"No routes found.")

def start_route_scraper(coords):
    for start_coordinates, end_coordinates in coords:
        for travel_mode in TRAVEL_MODES:
            scrape_and_save_routes(travel_mode, start_coordinates, end_coordinates)

if __name__ == "__main__":
    coords = []
    start_route_scraper(coords)