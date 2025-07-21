# API Сервис для работы с пользователями

### API Endpoints
| Метод | Endpoint             | Описание                                   | Тело запроса  | Auth          |
|--------|----------------------|------------------------------|-------------------------|------|
| GET    | `/api/users`         | Получить всех пользователей            |  -                                   | Bearer Token |
| GET   | `/api/users/:id`         | Получить пользователя по id                              | -       | Bearer Token |
| PATCH    | `/api/users/:id`          | обновить статус                | `{ status: "active" or "blocked" }`                     | Bearer Token |
| POST    | `/api/auth/register`          | регистрация пользователя               | `{fullName: string, birthDate: Date, email: string, password: string, role?: "user" or "admin", status?: "active" or "blocked"}`                     | - |
| POST    | `/api/auth/login`          | авторизация пользователя                | `{ email: string; password: string }`                     | - |
