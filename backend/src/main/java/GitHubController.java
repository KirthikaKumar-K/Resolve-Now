import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private static final Dotenv dotenv = Dotenv.load();
   private static final String GITHUB_TOKEN = dotenv.get("GITHUB_TOKEN");
    private static final String OWNER = dotenv.get("GITHUB_OWNER");
    private static final String REPO = dotenv.get("GITHUB_REPO");

    @PostMapping("/create")
    public ResponseEntity<?> createIssue(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("REQUEST BODY = " + body);

            String title = (String) body.get("title");
            String description = (String) body.get("description");

            if (title == null || title.isEmpty()) {
                return ResponseEntity.badRequest().body("TITLE IS REQUIRED");
            }

            String url = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/issues";
            System.out.println("GitHub URL = " + url);

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(GITHUB_TOKEN);
            headers.set("Accept", "application/vnd.github+json");

            Map<String, Object> payload = new HashMap<>();
            payload.put("title", title);
            payload.put("body", description);

            // Optional labels
            if (body.containsKey("labels")) {
                payload.put("labels", body.get("labels"));
            }

            // Optional assignees
            if (body.containsKey("assignees")) {
                payload.put("assignees", body.get("assignees"));
            }

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, entity, String.class);

            System.out.println("GitHub Response Status = " + response.getStatusCode());
            System.out.println("GitHub Response Body = " + response.getBody());

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("ERROR: " + e.getMessage());
        }
    }
}
