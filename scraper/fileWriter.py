import csv

def append_to_csv(data, filename):
    with open(filename, 'a', newline='', encoding="utf-16") as file:
        # Write header if file is empty
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        if file.tell() == 0:
            writer.writeheader()
        writer.writerows(data)