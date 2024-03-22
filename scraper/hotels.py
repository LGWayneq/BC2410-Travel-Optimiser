import requests
from fileWriter import append_to_csv
from serpapi import API_KEY

CHECK_IN_DATES = [
    "2024-05-01",
    "2024-05-02",
]
CHECK_OUT_DATES = [
    "2024-05-08",
]
CITIES = [
    "Tokyo",
    "Seoul",
    "Beijing",
    "Hong Kong",
    "Taipei",
    "Bangkok",
    "Kuala Lumpur",
    "Jakarta",
    "Manila",
]

def format_url(city, check_in_date, check_out_date, adults, children):
    return f"https://serpapi.com/search.json?engine=google_hotels&q={city}&check_in_date={check_in_date}&check_out_date={check_out_date}&adults={adults}&children={children}&currency=SGD&gl=sg&hl=en&api_key={API_KEY}"

def scrape_hotel_data(city, check_in_date, check_out_date, adults, children):
    url = format_url(city, check_in_date, check_out_date, adults, children)

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        all_hotels = []
        for property in data["properties"]:
            all_hotels.append({
                "type": property["type"] if "type" in property else None, 
                "name": property["name"] if "name" in property else None,
                "description": property["description"] if "description" in property else None,
                "eco_certified": property["eco_certified"] if "eco_certified" in property else None,
                "gps_coordinates": property["gps_coordinates"] if "gps_coordinates" in property else None,
                "check_in_time": property["check_in_time"] if "check_in_time" in property else None,
                "check_out_time": property["check_out_time"] if "check_out_time" in property else None,
                "rate_per_night": property["rate_per_night"] if "rate_per_night" in property else None,
                "total_rate": property["total_rate"] if "total_rate" in property else None,
                "prices": property["prices"] if "prices" in property else None,
                "nearby_places": property["nearby_places"] if "nearby_places" in property else None,
                "hotel_class": property["hotel_class"] if "hotel_class" in property else None,
                "extracted_hotel_class": property["extracted_hotel_class"] if "extracted_hotel_class" in property else None,
                "images": property["images"] if "images" in property else None,
                "overall_rating": property["overall_rating"] if "overall_rating" in property else None,
                "reviews": property["reviews"] if "reviews" in property else None,
                "ratings": property["ratings"] if "ratings" in property else None,
                "location_rating": property["location_rating"] if "location_rating" in property else None,
                "reviews_breakdown": property["reviews_breakdown"] if "reviews_breakdown" in property else None,
                "amenities": property["amenities"] if "amenities" in property else None,
                "excluded_amenities": property["excluded_amenities"] if "excluded_amenities" in property else None,
                "essential_info": property["essential_info"] if "essential_info" in property else None,
            })
        return all_hotels
    else:
        print("Failed to fetch data from Google Hotels.")
        print(response.text)

def scrape_and_save_hotels(city, check_in_date, check_out_date, adults = 2, children = 0, verbose = False):
    hotels = scrape_hotel_data(city, check_in_date, check_out_date, adults, children)
    filename = r'C:/Users/G Wayne/Desktop/BC2410/Demo/BC2410-Travel-Optimiser/scraper/hotels.csv'
    append_to_csv(hotels, filename)
    if verbose:
        print(hotels)
        if hotels:
            print(f"hotels Information for {city}:")
            for hotel in hotels:
                print(hotel)
        else:
            print(f"No hotels found for {city}.")

def start_hotel_scraper():
    for check_in_date in CHECK_IN_DATES:
        for checkout_date in CHECK_OUT_DATES:
            for city in CITIES:
                scrape_and_save_hotels(city, check_in_date, checkout_date)

if __name__ == "__main__":
    start_hotel_scraper()