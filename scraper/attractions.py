import requests
from fileWriter import append_to_csv
from serpapi import API_KEY

COORDINATES = [
    (35.6895, 139.6917), # Tokyo
    (37.5665, 126.9780), # Seoul
    (39.9042, 116.4074), # Beijing
    (25.0330, 121.5654), # Taipei
    (10.8231, 106.6297), # Ho Chi Minh
]

CATEGORIES = [
    "Parks",
    "Beaches",
    "Caves",
    "Cliffs",
    "Mountains",
    "Hills",
    "Waterfalls",
    "Islands",
    "Forests",
    "Entertainment parks",
    "Wildlife attractions",
    "Museums and art galleries",
    "Historical/Heritage attractions",
    "Spectating sport attractions",
    "Markets",
    "Festivals and parades",
    "Exhibitions",
    "Entertainment venues"
]

def format_url(query, coordinates):
    return f"https://serpapi.com/search.json?engine=google_maps&q={query}&ll=@{coordinates[0]},{coordinates[1]},10z&api_key={API_KEY}"

def scrape_attraction_data(query, coordinates):
    url = format_url(query, coordinates)

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        all_attractions = []
        for property in data["local_results"]:
            all_attractions.append({
                "title": property["title"] if "title" in property else None, 
                "place_id": property["place_id"] if "place_id" in property else None,
                "latitude": property["latitude"] if "latitude" in property else None,
                "longitude": property["longitude"] if "longitude" in property else None,
                "rating": property["rating"] if "rating" in property else None,
                "reviews": property["reviews"] if "reviews" in property else None,
                "price": property["price_level"] if "price_level" in property else None,
                "type": property["type"] if "type" in property else None,
                "thumbnail": property["thumbnail"] if "thumbnail" in property else None,
            })
        return all_attractions
    else:
        print("Failed to fetch data from Google Maps.")
        print(response.text)

def scrape_and_save_attractions(query, coordinates, verbose = False):
    attractions = scrape_attraction_data(query, coordinates)
    filename = r'C:/Users/G Wayne/Desktop/BC2410/Demo/BC2410-Travel-Optimiser/scraper/attractions.csv'
    append_to_csv(attractions, filename)
    if verbose:
        print(attractions)
        if attractions:
            print(f"attractions Information:")
            for attraction in attractions:
                print(attraction)
        else:
            print(f"No attractions found.")

def start_attraction_scraper():
    for query in CATEGORIES:
        for coordinates in COORDINATES:
            scrape_and_save_attractions(query, coordinates)

if __name__ == "__main__":
    start_attraction_scraper()