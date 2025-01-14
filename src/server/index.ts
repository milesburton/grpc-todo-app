import { Server, ServerCredentials } from "@grpc/grpc-js";
import { TaskServiceService } from "./taskService";
import { TaskServiceImplementation } from "./taskService";
// If you create a user service, import that too
// import { UserServiceService, UserServiceImplementation } from "./userService";

function main() {
  const server = new Server();

  server.addService(TaskServiceService, TaskServiceImplementation);
  // server.addService(UserServiceService, UserServiceImplementation);

  const port = 50051;
  server.bindAsync(\`0.0.0.0:\${port}\`, ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error("Server binding error:", err);
      return;
    }
    console.log(\`Server running on port \${boundPort}\`);
    server.start();
  });
}

main();
