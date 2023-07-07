# Welcome to Digital Cow Hat.

### Live site link[https://assignment-three-six.vercel.app/]

## Application Routes:

### Auth (Admin)

- `/api/v1/admins/create-admin` (POST)
- `/api/v1/admins/login` (POST)

### Auth (User)

- `api/v1/auth/login` (POST)
- `api/v1/auth/signup` (POST)
- `api/v1/auth/refresh-token` (POST)
- `api/v1/users` (GET All Users)
- `api/v1/users/:id` ( GET Single User Data)
- `api/v1/users/:id` (Update Single User-PATCH)
- `api/v1/users/:id` (DELETE Single User)

#### Bonus Part
- `api/v1/users/my-profile` (GET)
- `api/v1/users/my-profile` (PATCH)

### Cows

- `api/v1/cows` (POST)
- `api/v1/cows` (GET All cows)
- `api/v1/cows/:id` ( GET Single Cow Data)
- `api/v1/cows/:id` (Update Single Cow-PATCH)
- `api/v1/cows/:id` (DELETE Single Cow)

### Orders

- `api/v1/orders` (POST)
- `api/v1/orders` (GET)

#### Bonus Part
- `api/v1/orders/:id` (GET)