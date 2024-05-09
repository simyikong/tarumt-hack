import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Options {
    private static final String USERS_FILE = "users.json";
    private static final String ALERTS_FILE = "potential_hacks.json";
    private static final int MAX_ATTEMPTS = 5;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt user for username and validate against users.json
        String username = promptUsername(scanner);
        String role = getUserRole(username);
        // Prompt user for password
        int attempts = 0;
        while (attempts < MAX_ATTEMPTS) {
            System.out.print("Enter password: ");
            String password = scanner.nextLine();

            // Check if password is correct
            if (checkPassword(username, password)) {
                System.out.println("Password accepted. Access granted.");
                break;
            } else {
                attempts++;
                System.out.println("Incorrect password. Please try again.");

                // Check if all attempts failed
                if (attempts == MAX_ATTEMPTS) {
                    System.out.println("Maximum number of attempts reached. Exiting...");
                    logPotentialHack(username);
                    return; // Exit the program
                }
            }
        }

        if (role == null) {
            System.out.println("Invalid username. Exiting...");
            return;
        }


        // Display menu options based on user role
        System.out.println("Welcome, " + username + "! Your role is: " + role);
        System.out.println("Options Available:");
        if (role.equals("ADMIN")) {
            System.out.println("1. View Data");
            System.out.println("2. Edit Data");
        } else {
            System.out.println("1. View Data");
        }
        System.out.println("Type 'exit' to end execution");

        // Continue with menu options
        String option;
        do {
            System.out.print("Choose an option: ");
            option = scanner.nextLine();

            switch (option) {
                case "1":
                    viewDataMenu(scanner, role);
                    break;
                case "2":
                    if (role.equals("ADMIN")) {
                        editDataMenu(scanner);
                    } else {
                        System.out.println("You do not have permission to edit data.");
                    }
                    break;
                case "exit":
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid option. Please choose again.");
            }
        } while (!option.equalsIgnoreCase("exit"));

        // Close scanner
        scanner.close();
    }

    private static String promptUsername(Scanner scanner) {
        System.out.print("Enter your username: ");
        return scanner.nextLine();
    }

    private static String getUserRole(String username) {
        try {
            JSONParser parser = new JSONParser();
            JSONArray users = (JSONArray) parser.parse(new FileReader(USERS_FILE));

            for (Object obj : users) {
                JSONObject user = (JSONObject) obj;
                String storedUsername = (String) user.get("username");
                if (storedUsername.equals(username)) {
                    return (String) user.get("role");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static void viewDataMenu(Scanner scanner, String role) {
        // Implement view data menu
        System.out.println("Implementing view data menu...");
        // Provide options to select data file and view data
    }

    private static void editDataMenu(Scanner scanner) {
        // Implement edit data menu
        System.out.println("Implementing edit data menu...");
        // Provide options to select data file and edit data
    }

    private static boolean checkPassword(String username, String password) {
        try {
            JSONParser parser = new JSONParser();
            JSONObject userPasswords = (JSONObject) parser.parse(new FileReader("user_passwords.json"));
    
            // Check if the username exists in the JSON object
            if (userPasswords.containsKey(username)) {
                // Get the password associated with the username
                String storedPassword = (String) userPasswords.get(username);
    
                // Check if the provided password matches the stored password
                if (storedPassword.equals(password)) {
                    return true; // Password is correct
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false; // Password is incorrect or username not found
    }

    private static void logPotentialHack(String username) {
        // Create Gson instance with pretty printing enabled
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        // Create JSON object for potential hack
        Map<String, Object> potentialHack = new HashMap<>();
        potentialHack.put("timestamp", LocalDateTime.now().toString());
        potentialHack.put("username", username);
        potentialHack.put("message", "Potential hack detected - Multiple failed login attempts.");

        try (FileWriter writer = new FileWriter(ALERTS_FILE)) {
            // Convert the potential hack details to JSON format and write it to the file
            gson.toJson(potentialHack, writer);
            System.out.println("Potential hack details logged to file: " + ALERTS_FILE);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
