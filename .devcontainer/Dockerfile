# Use Node 22.13.0 Debian-based image
FROM node:22.13.0

# Install required packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    unzip \
    build-essential \
    ca-certificates \
    sudo \
    fish \
    && rm -rf /var/lib/apt/lists/*

# Add 'node' user to sudoers for passwordless sudo
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Upgrade npm globally (optional, but often helpful)
RUN npm install -g npm@latest

# Download and install the protobuf compiler
ARG PROTOC_VERSION=24.3
ARG PROTOC_ZIP=protoc-${PROTOC_VERSION}-linux-x86_64.zip
RUN curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/${PROTOC_ZIP} \
    && unzip -o ${PROTOC_ZIP} -d /usr/local bin/protoc \
    && unzip -o ${PROTOC_ZIP} -d /usr/local 'include/*' \
    && rm -f ${PROTOC_ZIP} \
    && chmod -R 755 /usr/local/bin/protoc \
    && chmod -R 755 /usr/local/include

# Ensure local node_modules/.bin is on PATH for convenience
ENV PATH="/workspace/node_modules/.bin:${PATH}"

# Set fish as the default shell for node user
RUN chsh -s /usr/bin/fish node

WORKDIR /workspace

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies here so they're cached in a Docker layer
RUN sudo npm install

# Copy the rest of the project
COPY . .

# Expose gRPC port
EXPOSE 50051

# Switch to non-root user
USER node

# Default command (could be "npm run dev", "npm start", etc.)
CMD ["npm", "run", "dev"]
