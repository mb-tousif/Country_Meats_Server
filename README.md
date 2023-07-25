# Welcome to Country Meats LTD.

### Live site link[https://meat-server.vercel.app/]

## Application Routes:

### Auth (Admin)

- `https://meat-server.vercel.app/api/v1/admins/create-admin` (POST)
- `https://meat-server.vercel.app/api/v1/admins/login` (POST)

### Auth (User)

- `https://meat-server.vercel.app/api/v1/auth/login` (POST)
- `https://meat-server.vercel.app/api/v1/auth/signup` (POST)
- `https://meat-server.vercel.app/api/v1/auth/refresh-token` (POST)
- `https://meat-server.vercel.app/api/v1/users` (GET All Users)
- `https://meat-server.vercel.app/api/v1/users/:id` ( GET Single User Data)
- `https://meat-server.vercel.app/api/v1/users/:id` (Update Single User-PATCH)
- `https://meat-server.vercel.app/api/v1/users/:id` (DELETE Single User)
- `https://meat-server.vercel.app/api/v1/users/my-profile` (GET)
- `https://meat-server.vercel.app/api/v1/users/my-profile` (PATCH)

### Cows

- `https://meat-server.vercel.app/api/v1/cows` (POST)
- `https://meat-server.vercel.app/api/v1/cows` (GET All cows)
- `https://meat-server.vercel.app/api/v1/cows/:id` ( GET Single Cow Data)
- `https://meat-server.vercel.app/api/v1/cows/:id` (Update Single Cow-PATCH)
- `https://meat-server.vercel.app/api/v1/cows/:id` (DELETE Single Cow)

### Goats

- `https://meat-server.vercel.app/api/v1/goats` (POST)
- `https://meat-server.vercel.app/api/v1/goats` (GET All goats)
- `https://meat-server.vercel.app/api/v1/goats/:id` ( GET Single Goat Data)
- `https://meat-server.vercel.app/api/v1/goats/:id` (Update Single Goat-PATCH)
- `https://meat-server.vercel.app/api/v1/goats/:id` (DELETE Single Goat)

### Orders

- `https://meat-server.vercel.app/api/v1/orders` (POST)
- `https://meat-server.vercel.app/api/v1/orders` (GET)
- `https://meat-server.vercel.app/api/v1/orders/:id` (GET)