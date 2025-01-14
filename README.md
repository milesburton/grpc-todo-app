I'll help make the README more friendly and streamline its structure. Here's an improved version:

# Welcome to gRPC ToDo App! 👋

Hey there! This is a fun little project that shows how to build a ToDo application using gRPC and TypeScript. It's perfect for learning how microservices work in practice.

## Quick Links
- **GitHub:** [milesburton/grpc-todo-app](https://github.com/milesburton/grpc-todo-app)
- **License:** [MIT License](./LICENSE)

## Let's Get Started!

Getting up and running is super easy:

1. First, grab all the dependencies:
   ```bash
   npm install
   ```

2. Next, compile the protobuf definitions:
   ```bash
   npm run proto:compile
   ```

3. Finally, fire up the server (it'll run on port 50051):
   ```bash
   npm start
   ```

And that's it - you're ready to go! 🚀

## Using VS Code? We've Got You Covered!

This project comes with a Dev Container configuration for VS Code. What does this mean for you? When you open the project, VS Code will automatically set up a development environment with everything you need - Node.js, the protobuf compiler, and all the right extensions. No manual setup required!

To use it, just open the project in VS Code and it'll prompt you to reopen in a container. Click "Reopen in Container" and VS Code will handle the rest.

---

Happy coding! If you run into any issues or have questions, feel free to open an issue on GitHub. 😊