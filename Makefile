# Colors for output
GREEN := \033[0;32m
NOCOLOR := \033[0m

.PHONY: up dev install build format lint typecheck test clean copy-check clear-branches validate help

# Default target
help:
	@echo "Available commands:"
	@echo "  up      - Start development server (npm run dev)"
	@echo "  dev     - Start development server (npm run dev)"
	@echo "  install - Install dependencies"
	@echo "  build       - Build the project"
	@echo "  format      - Format code with prettier"
	@echo "  lint        - Run linting and fix issues"
	@echo "  typecheck   - Run TypeScript type checking"
	@echo "  test        - Run tests"
	@echo "  clean     - Clean build artifacts"
	@echo "  copy-check    - Check for code duplication"
	@echo "  clear-branches - Remove old merged branches"
	@echo "  validate      - Run format, lint, typecheck and copy-check"
	@echo "  help          - Show this help message"

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

# Format code with prettier
format:
	npm run format

# Run linting and fix issues
lint:
	npm run lint

# Run TypeScript type checking
typecheck:
	npm run typecheck

# Run tests
test:
	npm test

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf node_modules/.cache

# Check for code duplication
copy-check:
	npx jscpd . --silent

# Remove old merged branches
clear-branches:
	@echo ""
	@git pull; git branch | grep -vE "(^\*|master|main|develop)" | xargs -r git branch -d
	@echo ""
	@echo "${GREEN}All old merged removed!${NOCOLOR}"
	@echo ""

# Run all validation checks
validate:
	$(MAKE) format
	$(MAKE) lint
	$(MAKE) typecheck
	$(MAKE) copy-check
