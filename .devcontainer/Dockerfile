# Use specific Node.js version with full Debian base
FROM node:22.13.0

# Install required packages (protobuf compiler, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    unzip \
    build-essential \
    ca-certificates \
    sudo \
    fish \
    && rm -rf /var/lib/apt/lists/* # Clean up apt cache

# Add node user to sudo group and configure sudo access
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Update npm to latest version globally
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

WORKDIR /workspace

# Set fish as default shell for node user
RUN chsh -s /usr/bin/fish node

# Switch to non-root user
USER node

EXPOSE 50051

CMD ["npm", "run", "dev"]