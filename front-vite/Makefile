migrate-drop:
	migrate -path ./backend/db/migrations -database "postgresql://root:password@localhost:5432/chatme?sslmode=disable" -verbose drop

migrate-down:
	migrate -path ./backend/db/migrations -database "postgresql://root:password@localhost:5432/chatme?sslmode=disable" -verbose down

migrate-up: 
	migrate -path ./backend/db/migrations -database "postgresql://root:password@localhost:5432/chatme?sslmode=disable" -verbose up

create-migration:
	migrate create -ext sql -dir ./backend/db/migrations -seq init_schema

start-docker:
	docker start database-postgres