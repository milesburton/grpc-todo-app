# Welcome to gRPC ToDo App! 🚀

Hey there, awesome developer! 👋 This is a fun little project that shows how to build a ToDo application using gRPC and TypeScript. It's perfect for learning how microservices work in practice!

## Quick Links 🔗
- 📚 **GitHub:** [milesburton/grpc-todo-app](https://github.com/milesburton/grpc-todo-app)
- ⚖️ **License:** [MIT License](./LICENSE)

## Let's Get Started! 🎉

Setting up is as easy as 1-2-3:

1. 📦 First, grab all the dependencies:
   ```bash
   npm install
   ```

2. 🔨 Next, compile the protobuf definitions:
   ```bash
   npm run proto:compile
   ```

3. 🌟 Finally, fire up the server (it'll run on port 50051):
   ```bash
   npm start
   ```

Woohoo! You're all set and ready to rock! 🎸

## Using VS Code? You're in for a Treat! 🎈

This project comes with a magical Dev Container configuration for VS Code. ✨ What does this mean for you? When you open the project, VS Code will automatically set up a development environment with everything you need - Node.js, the protobuf compiler, and all the right extensions. No manual setup required!

Just open the project in VS Code and when it asks you to reopen in a container - click that "Reopen in Container" button and watch the magic happen! 🪄

## Setting Up Your SSH Keys 🔑

The Dev Container is configured to keep your SSH keys safe and sound. Here's how to get them set up:

### Option 1: The Easy Way (From Inside VS Code) 🏆

This is the simplest approach - just use VS Code's built-in terminal after your container is up and running:

1. 📺 Open VS Code's integrated terminal
2. 🛠️ Run these commands to set up your keys:
   ```bash
   # Create your cozy .ssh directory
   mkdir -p ~/.ssh

   # Copy over your SSH keys
   # (Don't forget to update these paths!)
   cat /path/to/your/id_rsa > ~/.ssh/id_rsa
   cat /path/to/your/id_rsa.pub > ~/.ssh/id_rsa.pub
   
   # Set the right permissions
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/*
   ```

### Option 2: From Your Host Machine 🖥️

If you prefer to copy keys from your host machine, here's how to do it (pick your operating system):

#### Windows (WSL2) 🪟
```bash
# Find your container (like a treasure hunt! 🗺️)
CONTAINER_ID=$(docker ps --filter "name=grpc-todo-app" --format "{{.ID}}")

# Copy those keys over
docker cp ~/.ssh/id_rsa $CONTAINER_ID:/home/node/.ssh/
docker cp ~/.ssh/id_rsa.pub $CONTAINER_ID:/home/node/.ssh/

# Make everything secure
docker exec -it $CONTAINER_ID bash -c '
  sudo chown -R node:node /home/node/.ssh \
  && sudo chmod 700 /home/node/.ssh \
  && sudo chmod 600 /home/node/.ssh/*'
```

#### macOS 🍎
```bash
# Find your container
CONTAINER_ID=$(docker ps --filter "name=grpc-todo-app" --format "{{.ID}}")

# Copy those keys over
docker cp ~/.ssh/id_rsa $CONTAINER_ID:/home/node/.ssh/
docker cp ~/.ssh/id_rsa.pub $CONTAINER_ID:/home/node/.ssh/

# Make everything secure
docker exec -it $CONTAINER_ID bash -c '
  sudo chown -R node:node /home/node/.ssh \
  && sudo chmod 700 /home/node/.ssh \
  && sudo chmod 600 /home/node/.ssh/*'
```

#### Linux 🐧
```bash
# Find your container
CONTAINER_ID=$(docker ps --filter "name=grpc-todo-app" --format "{{.ID}}")

# Copy those keys over
docker cp ~/.ssh/id_rsa $CONTAINER_ID:/home/node/.ssh/
docker cp ~/.ssh/id_rsa.pub $CONTAINER_ID:/home/node/.ssh/

# Make everything secure
docker exec -it $CONTAINER_ID bash -c '
  sudo chown -R node:node /home/node/.ssh \
  && sudo chmod 700 /home/node/.ssh \
  && sudo chmod 600 /home/node/.ssh/*'
```

### Double-Check Everything's Working ✅

Let's make sure your SSH keys are all set! Run this command in the VS Code terminal:
```bash
ls -la ~/.ssh
```

You should see your SSH keys listed with the right permissions (600 for key files, 700 for the .ssh directory). Looking good! 👍

## Need Help? 💭

Run into a snag? No worries! Feel free to open an issue on GitHub - we're here to help! 🤝

---

Happy coding! 🌈 May your code be bug-free and your coffee be strong! ☕