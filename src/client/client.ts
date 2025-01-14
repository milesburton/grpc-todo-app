import { credentials } from "@grpc/grpc-js";
import { TaskServiceClient } from "../generated/task_grpc_pb";
import { Task, TaskRequest, TaskIdRequest } from "../generated/task_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

async function main() {
  const client = new TaskServiceClient("localhost:50051", credentials.createInsecure());

  // 1. Create a new Task
  const newTask = new Task();
  newTask.setTitle("Sample Task");
  newTask.setDescription("Learn gRPC with TypeScript in a dev container!");
  newTask.setCompleted(false);

  const createReq = new TaskRequest();
  createReq.setTask(newTask);

  client.createTask(createReq, (err, response) => {
    if (err) {
      console.error("CreateTask Error:", err.message);
      return;
    }
    console.log("Created Task:", response.getTask()?.toObject());

    // 2. List all tasks
    client.listTasks(new Empty(), (listErr, listResp) => {
      if (listErr) {
        console.error("ListTasks Error:", listErr.message);
        return;
      }
      console.log("All tasks:", listResp.getTasksList().map(t => t.toObject()));

      // 3. Retrieve the newly created Task
      const taskId = response.getTask()?.getId() || "";
      const getReq = new TaskIdRequest();
      getReq.setId(taskId);

      client.getTask(getReq, (getErr, getResp) => {
        if (getErr) {
          console.error("GetTask Error:", getErr.message);
          return;
        }
        console.log("Retrieved Task:", getResp.getTask()?.toObject());
      });
    });
  });
}

main();
