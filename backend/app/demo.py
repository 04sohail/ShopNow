import requests
import json

# Fetch data from the API
url = "https://dummyjson.com/products/"
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    
    # Save the data to a JSON file
    with open("products_data.json", "w") as file:
        json.dump(data, file, indent=4)

    print("Data saved to products_data.json")
else:
    print(f"Failed to retrieve data: {response.status_code}")
