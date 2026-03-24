.PHONY: up dev install build lint test clean help

# Default target
help:
	@echo "Available commands:"
	@echo "  up      - Start development server (npm run dev)"
	@echo "  dev     - Start development server (npm run dev)"
	@echo "  install - Install dependencies"
	@echo "  build   - Build the project"
	@echo "  lint    - Run linting"
	@echo "  test    - Run tests"
	@echo "  clean   - Clean build artifacts"
	@echo "  help    - Show this help message"

# Start development server
up:
	npm run dev

# Alias for up
dev:
	npm run dev

# Install dependencies
install:
	npm install

# Build the project
build:
	npm run build

# Run linting
lint:
	npm run lint

# Run tests
test:
	npm test

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf node_modules/.cache
