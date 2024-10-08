# Restful API Mushrooms

![Mushrooms](./image_mushroom.jpg)

This is a RESTful API for mushroom information using Hono and Bun.

## Setup

To install dependencies:

```bash
bun install
```

## Running the project

To run the development server:

```bash
bun run dev
```

This will start the server at [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /`: Welcome message and list of available endpoints
- `GET /api/mushrooms`: Get all mushrooms
- `GET /api/mushrooms/:id`: Get a specific mushroom by ID
- `GET /api/mushrooms/search?q={query}`: Search mushrooms by name or common name

## Docker

To build and run the Docker container:

```bash
docker build -t mushroom-api .
docker run -p 3000:3000 mushroom-api
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)