# Colors for output
GREEN := \033[0;32m
NOCOLOR := \033[0m

.PHONY: up dev install build format lint check typecheck clean clear-branches validate help

# Default target
help:
	@echo "Available commands:"
	@echo "  up / dev       - Start development server"
	@echo "  install        - Install dependencies"
	@echo "  build          - Build the project"
	@echo "  format         - Format code with Biome"
	@echo "  lint           - Lint code with Biome"
	@echo "  check          - Format, lint and organize imports with Biome"
	@echo "  typecheck      - Run TypeScript type checking"
	@echo "  validate       - Run check and typecheck"
	@echo "  clean          - Clean build artifacts"
	@echo "  clear-branches - Remove old merged branches"
	@echo "  help           - Show this help message"

up dev:
	npm run dev

install:
	npm install

build:
	npm run build

format:
	npm run format

lint:
	npm run lint

check:
	npm run check

typecheck:
	npm run typecheck

clean:
	rm -rf .next
	rm -rf node_modules/.cache

clear-branches:
	@echo ""
	@git pull; git branch | grep -vE "(^\*|master|main|develop)" | xargs -r git branch -d
	@echo ""
	@echo "${GREEN}All old merged removed!${NOCOLOR}"
	@echo ""

validate:
	$(MAKE) check
	$(MAKE) typecheck
