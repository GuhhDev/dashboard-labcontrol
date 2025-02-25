# Project Setup

## Running Keycloak and PostgreSQL

This project uses Docker Compose to run Keycloak and PostgreSQL. Here are the details of the services:

### PostgreSQL
- Port: 5432
- Database: keycloak
- Username: keycloak
- Password: password

### Keycloak
- URL: http://localhost:8080
- Admin Console: http://localhost:8080/admin
- Admin Username: admin
- Admin Password: admin

## How to Start

1. Make sure you have Docker and Docker Compose installed
2. Run the following command in the project directory:
   ```bash
   docker-compose up -d
   ```

3. Wait for the services to start (this may take a few moments)
4. Access Keycloak admin console at http://localhost:8080/admin
5. Log in with the admin credentials (admin/admin)

## How to Stop

To stop the services, run:
```bash
docker-compose down
```

To stop and remove all data (including the database), run:
```bash
docker-compose down -v
```
