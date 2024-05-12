import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Main {
    private static final String FILE_PATH = "users.json";
    private static final String USER_PASSWORDS_FILE = "user_passwords.json";

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // Create Scanner object for user input
        Scanner scanner = new Scanner(System.in);
        // Map to store usernames and passwords
        Map<String, String> userPasswords = new HashMap<>();
        // Prompt user to enter number of new users
        System.out.print("Enter number of new users: ");
        int numNewUsers = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        // Read existing user data from JSON file
        JSONArray users = readUserData();

        // Prompt user to enter data for each new user
        for (int i = 0; i < numNewUsers; i++) {
            System.out.println("Enter data for New User " + (i + 1) + ":");
            System.out.print("Username: ");
            String username = scanner.nextLine();
            System.out.print("Role (ADMIN or USER): ");
            String role = scanner.nextLine().toUpperCase();
            System.out.print("Password: ");
            String password = scanner.nextLine();
            

            // Create JSON object for new user data
            JSONObject newUser = new JSONObject();
            newUser.put("username", username);
            newUser.put("role", role);
            userPasswords.put(username, password);

            // Add new user data to existing JSON array
            users.add(newUser);
        }

        // Write updated user data back to JSON file
        try (FileWriter file = new FileWriter(FILE_PATH)) {
            file.write(users.toJSONString());
            file.flush();
            System.out.println("New user data stored successfully in users.json.");
        } catch (Exception e) {
            e.printStackTrace();
        }

        writeUserPasswordsToFile(userPasswords);
        // Close scanner
        scanner.close();
    }

    private static JSONArray readUserData() {
        try {
            JSONParser parser = new JSONParser();
            FileReader reader = new FileReader(FILE_PATH);
            return (JSONArray) parser.parse(reader);
        } catch (Exception e) {
            e.printStackTrace();
            return new JSONArray(); // Return empty array if file doesn't exist or cannot be read
        }
    }

    private static void writeUserPasswordsToFile(Map<String, String> userPasswords) {
    // Create Gson instance with pretty printing enabled
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    try (FileWriter writer = new FileWriter(USER_PASSWORDS_FILE)) {
        // Convert the map to JSON format and write it to the file
        gson.toJson(userPasswords, writer);
        System.out.println("User passwords written to file: " + USER_PASSWORDS_FILE);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
}
