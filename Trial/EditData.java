import java.io.FileReader;
import java.io.FileWriter;
import java.util.Scanner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class EditData {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // List customer files available
        System.out.println("Available Customer Files:");
        System.out.println("1. Customer1Dat.json");
        System.out.println("2. Customer2Dat.json");
        System.out.print("Enter the number of the file to edit: ");
        String fileNumber = scanner.nextLine();

        String filename = "";
        switch (fileNumber) {
            case "1":
                filename = "Customer1Dat.json";
                break;
            case "2":
                filename = "Customer2Dat.json";
                break;
            default:
                System.out.println("Invalid file number.");
                scanner.close();
                return;
        }

        // Read data from selected file
        JSONArray data = readDataFromFile(filename);

        // Display list of items available for editing
        System.out.println("Available Data Items:");
        for (int i = 0; i < data.size(); i++) {
            JSONObject item = (JSONObject) data.get(i);
            System.out.println((i + 1) + ". " + item.keySet().iterator().next());
        }

        // Prompt user to choose data item to edit
        System.out.print("Choose the number of the item to edit: ");
        int itemNumber = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        // Prompt user to input new value for selected data item
        System.out.print("Enter the new value: ");
        String newValue = scanner.nextLine();

        // Update selected data item with new value
        JSONObject selectedItem = (JSONObject) data.get(itemNumber - 1);
        String selectedKey = (String) selectedItem.keySet().iterator().next();
        selectedItem.put(selectedKey, newValue);

        // Write updated data back to file
        writeDataToFile(filename, data);

        System.out.println("Data item \"" + selectedKey + "\" updated successfully.");

        // Close scanner
        scanner.close();
    }

    private static JSONArray readDataFromFile(String filename) {
        try {
            JSONParser parser = new JSONParser();
            FileReader reader = new FileReader(filename);
            Object obj = parser.parse(reader);
            
            if (obj instanceof JSONArray) {
                return (JSONArray) obj; // Return the JSON array if the content is an array
            } else if (obj instanceof JSONObject) {
                // If the content is an object, check if it contains the "data" key
                JSONObject jsonObj = (JSONObject) obj;
                if (jsonObj.containsKey("data")) {
                    return (JSONArray) jsonObj.get("data");
                } else {
                    // If "data" key is not found, return an empty array
                    return new JSONArray();
                }
            } else {
                return new JSONArray(); // Return empty array if content is neither array nor object
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new JSONArray(); // Return empty array if file doesn't exist or cannot be read
        }
    }
    
    
    

    private static void writeDataToFile(String filename, JSONArray data) {
        try (FileWriter file = new FileWriter(filename)) {
            file.write(data.toJSONString());
            file.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
