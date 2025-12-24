# Task Manager - Microservices Application

A full-stack task management application built with Spring Boot microservices and Angular.

# Video-DEMO

https://drive.google.com/file/d/1QkRXugk7C32BUalXbIQ7BRtk79o9TM_i/view?usp=sharing

##  Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Angular 17    │────▶│   API Gateway   │
│   Frontend      │     │   (Port 8888)   │
└─────────────────┘     └────────┬────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Auth Service  │     │Project Service│     │ Task Service  │
│ (Port 8099)   │     │ (Port 8082)   │     │ (Port 8083)   │
└───────────────┘     └───────────────┘     └───────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │ Eureka Server   │
                        │ (Port 8761)     │
                        └─────────────────┘
```

##  Services

| Service | Port | Description |
|---------|------|-------------|
| Discovery Service | 8761 | Eureka Server for service registration |
| API Gateway | 8888 | Entry point, routing & JWT validation |
| Auth Service | 8099 | User authentication & JWT generation |
| Project Service | 8082 | Project CRUD operations |
| Task Service | 8083 | Task CRUD operations |
| Frontend | 4200 | Angular 17 web application |

##  Technologies

### Backend
- Java 21
- Spring Boot 3.4
- Spring Cloud Gateway
- Spring Cloud Netflix Eureka
- Spring Security with JWT
- MySQL Database
- Maven

### Frontend
- Angular 17
- TypeScript
- RxJS
- SCSS

##  Getting Started

### Prerequisites
- Java 21+
- Node.js 18+
- MySQL Server
- Maven

### Database Setup
```sql
CREATE DATABASE logindb;
CREATE DATABASE project_db;
CREATE DATABASE task_db;
```

### Start Services (in order)

1. **Discovery Service**
```bash
cd Discovery-service
mvn spring-boot:run
```

2. **Auth Service**
```bash
cd auth-service
mvn spring-boot:run
```

3. **Project Service**
```bash
cd project-service
mvn spring-boot:run
```

4. **Task Service**
```bash
cd task-service
mvn spring-boot:run
```

5. **Gateway Service**
```bash
cd gateway-service
mvn spring-boot:run
```

6. **Frontend**
```bash
cd frontend
npm install
npm start
```

##  Access Points

- **Frontend**: http://localhost:52141
- **API Gateway**: http://localhost:8888
- **Eureka Dashboard**: http://localhost:8761

##  Test Credentials

```
Email: user@test.com
Password: password123
```

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | User login |
| POST | /auth/register | User registration |
| GET | /api/projects | Get user's projects |
| POST | /api/projects | Create project |
| GET | /api/projects/{id} | Get project details |
| GET | /api/projects/{id}/progress | Get project progress |
| GET | /api/projects/{id}/tasks | Get project tasks |
| POST | /api/projects/{id}/tasks | Create task |
| PATCH | /api/tasks/{id}/complete | Mark task complete |
| DELETE | /api/tasks/{id} | Delete task |

##  Author

Khalid Echdeigui - EMSI student

##  License

This project is for my internship test .
