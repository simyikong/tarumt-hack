import re
from collections import defaultdict
import matplotlib.pyplot as plt
from statistics import mean, mode

# Regular expression patterns to extract date, time for connection and authentication failure
regex_pattern_connection = r'(\w{3} \d{2}) (\d{2}:\d{2}:\d{2}) .*connection'
regex_pattern_auth_failure = r'(\w{3} \d{2}) (\d{2}:\d{2}:\d{2}) .*authentication failure'

# Function to parse the log file and extract information
def parse_log_file(file_path):
    connection_count_per_day = defaultdict(int)
    connection_times_per_day = defaultdict(list)
    auth_failure_count_per_day = defaultdict(int)
    auth_failure_times_per_day = defaultdict(list)

    with open(file_path, 'r') as file:
        for line in file:
            match_conn = re.search(regex_pattern_connection, line)
            match_auth = re.search(regex_pattern_auth_failure, line)
            if match_conn:
                date, time = match_conn.groups()
                connection_count_per_day[date] += 1
                connection_times_per_day[date].append(time)
            if match_auth:
                date, time = match_auth.groups()
                auth_failure_count_per_day[date] += 1
                auth_failure_times_per_day[date].append(time)

    return (connection_count_per_day, connection_times_per_day, 
            auth_failure_count_per_day, auth_failure_times_per_day)

# Function to generate a graph for access by time for a day
def generate_access_graph(times_per_day, date, title):
    times = times_per_day[date]
    time_counts = defaultdict(int)
    for time in times:
        time_counts[time] += 1
    
    sorted_times = sorted(time_counts.items(), key=lambda x: x[0])
    x_values = [time for time, _ in sorted_times]
    y_values = [count for _, count in sorted_times]
    
    plt.figure(figsize=(10, 6))
    plt.plot(x_values, y_values, marker='o', linestyle='-')
    plt.title(f"{title} on {date}")
    plt.xlabel("Time")
    plt.ylabel("Number of Events")
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# Function to calculate mean and mode of event times per day
def calculate_statistics(times_per_day, date):
    times = times_per_day[date]
    times_in_seconds = [int(time[:2]) * 3600 + int(time[3:5]) * 60 + int(time[6:8]) for time in times]
    
    if times_in_seconds:
        mean_time_in_seconds = mean(times_in_seconds)
        try:
            mode_time_in_seconds = mode(times_in_seconds)
        except:
            mode_time_in_seconds = "No unique mode available"
        
        mean_time = f"{int(mean_time_in_seconds // 3600):02}:{int((mean_time_in_seconds % 3600) // 60):02}:{int(mean_time_in_seconds % 60):02}"
        
        if isinstance(mode_time_in_seconds, int):
            mode_time = f"{int(mode_time_in_seconds // 3600):02}:{int((mode_time_in_seconds % 3600) // 60):02}:{int(mode_time_in_seconds % 60):02}"
        else:
            mode_time = mode_time_in_seconds
        
        print(f"Mean time: {mean_time}")
        print(f"Mode time: {mode_time}")
    else:
        print("No events recorded for the given date.")

# Example usage
log_file_path = "Linux_2k.log"
(connection_count_per_day, connection_times_per_day, 
 auth_failure_count_per_day, auth_failure_times_per_day) = parse_log_file(log_file_path)

# Summary of access per day
print("Connection Logs Summary:")
for date, count in connection_count_per_day.items():
    print(f"Date: {date}, Total Connections: {count}")

print("\nAuthentication Failure Logs Summary:")
for date, count in auth_failure_count_per_day.items():
    print(f"Date: {date}, Total Authentication Failures: {count}")

# User input for generating the desired graph and statistics
log_type = input("Enter the log type (connection/authentication): ").strip().lower()
target_date = input("Enter the desired date (e.g. Jun 17): ")

if log_type == "connection":
    if target_date in connection_times_per_day:
        generate_access_graph(connection_times_per_day, target_date, "Connections")
        calculate_statistics(connection_times_per_day, target_date)
    else:
        print(f"No connection data available for {target_date}.")
elif log_type == "authentication":
    if target_date in auth_failure_times_per_day:
        generate_access_graph(auth_failure_times_per_day, target_date, "Authentication Failures")
        calculate_statistics(auth_failure_times_per_day, target_date)
    else:
        print(f"No authentication failure data available for {target_date}.")
else:
    print("Invalid log type. Please enter either 'connection' or 'authentication'.")
