import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { IUserServiceServer, UserServiceService } from "../../src/generated/user_grpc_pb";
import { UserRequest, UserResponse, UserIdRequest } from "../../src/generated/user_pb";

// In-memory data store
const users: Map<string, any> = new Map();

export const UserServiceImplementation: IUserServiceServer = {
  createUser(call: ServerUnaryCall<UserRequest, UserResponse>, callback: sendUnaryData<UserResponse>) {
    const newUser = call.request.getUser();
    const userId = Math.random().toString(36).substring(2);
    newUser.setUserid(userId);
    users.set(userId, newUser);

    const response = new UserResponse();
    response.setUser(newUser);
    callback(null, response);
  },

  getUser(call: ServerUnaryCall<UserIdRequest, UserResponse>, callback: sendUnaryData<UserResponse>) {
    const userId = call.request.getUserid();
    const user = users.get(userId);
    if (!user) {
      return callback(new Error("User not found"), null);
    }
    const response = new UserResponse();
    response.setUser(user);
    callback(null, response);
  },
};

export { UserServiceService };
