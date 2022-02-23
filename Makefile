## up: bring the NestJs server and logging environment online using docker compose
up:
	@echo '🔥 bringing environment up'
	source ./development.sh && docker-compose up --build
upd:
	@echo '🔥 bringing environment up'
	source ./development.sh && docker-compose up -d --build

## down: shutdown the environment but persist data for next time
down:
	@echo '🛑 shutting down environment, data is preserved'
	source ./development.sh && docker-compose down

## destroy: shutdown the environment and remove all saved data
destroy:
	@echo '💣 shutting down environment and destroying data'
	source ./development.sh && docker-compose down -v