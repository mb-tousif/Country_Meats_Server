# Welcome to Digital Cow Hat.

### Live site link[https://auth-backend-vert.vercel.app/]

## Application Routes:

### Auth (Admin)

- `https://auth-backend-vert.vercel.app/api/v1/admins/create-admin` (POST)
- `https://auth-backend-vert.vercel.app/api/v1/admins/login` (POST)

### Auth (User)

- `https://auth-backend-vert.vercel.app/api/v1/auth/login` (POST)
- `https://auth-backend-vert.vercel.app/api/v1/auth/signup` (POST)
- `https://auth-backend-vert.vercel.app/api/v1/auth/refresh-token` (POST)
- `https://auth-backend-vert.vercel.app/api/v1/users` (GET All Users)
- `https://auth-backend-vert.vercel.app/api/v1/users/:id` ( GET Single User Data)
- `https://auth-backend-vert.vercel.app/api/v1/users/:id` (Update Single User-PATCH)
- `https://auth-backend-vert.vercel.app/api/v1/users/:id` (DELETE Single User)

#### Bonus Part
- `https://auth-backend-vert.vercel.app/api/v1/users/my-profile` (GET)
- `https://auth-backend-vert.vercel.app/api/v1/users/my-profile` (PATCH)

### Cows

- `https://auth-backend-vert.vercel.app/api/v1/cows` (POST)
- `https://auth-backend-vert.vercel.app/api/v1/cows` (GET All cows)
- `https://auth-backend-vert.vercel.app/api/v1/cows/:id` ( GET Single Cow Data)
- `https://auth-backend-vert.vercel.app/api/v1/cows/:id` (Update Single Cow-PATCH)
- `https://auth-backend-vert.vercel.app/api/v1/cows/:id` (DELETE Single Cow)

### Orders

- `https://auth-backend-vert.vercel.app/api/v1/orders` (POST)
- `https://auth-backend-vert.vercel.app/api/v1/orders` (GET)

#### Bonus Part
- `https://auth-backend-vert.vercel.app/api/v1/orders/:id` (GET)