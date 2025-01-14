import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { ITaskServiceServer, TaskServiceService } from "../../src/generated/task_grpc_pb";
import {
  TaskRequest,
  TaskResponse,
  TaskIdRequest,
  TaskListResponse,
} from "../../src/generated/task_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

// In-memory data store
const tasks: Map<string, any> = new Map();

export const TaskServiceImplementation: ITaskServiceServer = {
  createTask(call: ServerUnaryCall<TaskRequest, TaskResponse>, callback: sendUnaryData<TaskResponse>) {
    const newTask = call.request.getTask();
    const id = Math.random().toString(36).substring(2);
    newTask.setId(id);
    tasks.set(id, newTask);

    const response = new TaskResponse();
    response.setTask(newTask);
    callback(null, response);
  },

  getTask(call: ServerUnaryCall<TaskIdRequest, TaskResponse>, callback: sendUnaryData<TaskResponse>) {
    const id = call.request.getId();
    const task = tasks.get(id);
    if (!task) {
      return callback(new Error("Task not found"), null);
    }
    const response = new TaskResponse();
    response.setTask(task);
    callback(null, response);
  },

  updateTask(call: ServerUnaryCall<TaskRequest, TaskResponse>, callback: sendUnaryData<TaskResponse>) {
    const updatedTask = call.request.getTask();
    const id = updatedTask.getId();
    if (!tasks.has(id)) {
      return callback(new Error("Task not found"), null);
    }
    tasks.set(id, updatedTask);

    const response = new TaskResponse();
    response.setTask(updatedTask);
    callback(null, response);
  },

  deleteTask(call: ServerUnaryCall<TaskIdRequest, TaskResponse>, callback: sendUnaryData<TaskResponse>) {
    const id = call.request.getId();
    const deletedTask = tasks.get(id);
    if (!deletedTask) {
      return callback(new Error("Task not found"), null);
    }
    tasks.delete(id);

    const response = new TaskResponse();
    response.setTask(deletedTask);
    callback(null, response);
  },

  listTasks(call: ServerUnaryCall<Empty, TaskListResponse>, callback: sendUnaryData<TaskListResponse>) {
    const response = new TaskListResponse();
    response.setTasksList(Array.from(tasks.values()));
    callback(null, response);
  },
};

export { TaskServiceService };
