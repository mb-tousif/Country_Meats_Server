# Welcome to Digital Cow Hat.

### Live site link[https://assignment-three-six.vercel.app/]

## Application Routes:
### User

- `api/v1/auth/signup` (POST)
- `api/v1/users` (GET All Users)
- `api/v1/users/:id` ( GET Single User Data)
- `api/v1/users/:id` (Update Single User-PATCH)
- `api/v1/users/:id` (DELETE Single User)

### Cows

- `api/v1/cows` (POST)
- `api/v1/cows` (GET All cows)
- `api/v1/cows/:id` ( GET Single Cow Data)
- `api/v1/cows/:id` (Update Single Cow-PATCH)
- `api/v1/cows/:id` (DELETE Single Cow)

### Pagination and Filtering routes of Cows

- `api/v1/cows?page=1&limit=5`
- `api/v1/cows?sortBy=price&sortOrder=asc`
- `api/v1/cows?weight=350`
- `api/v1/cows?location=Chittagong`
- `api/v1/cows?searchTerm=Chi`
- `api/v1/cows?minPrice=20000&maxPrice=70000`

### Orders

- `api/v1/orders` (POST)
- `api/v1/orders` (GET)