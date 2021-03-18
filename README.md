# Record Collection API and front end

This repo is the API for Greg's record collection (the Logikcull exercise).
It's grown out of control and Greg needs an API to control his collection.

This project uses Rails for the API to create, read, update and delete records in Greg's collection.

## Records API
### Installation & running the API

To install all dependencies run
```
bundle install
```

To run migrations
```
bundle exec db:migrate
```

To start a webserver to run the API, use
```
bundle exec rails server
```

The API will then be available at http://localhost:3000

If you would like to add a couple of Sample records, you can seed the database with:
```
bundle exec db:seed
```

### Running Tests

The project uses RSpec (see [ADR 2](adr/02-rspec-rails-as-test-framework.md)) to run all tests. To run the tests, run

```
bundle exec rspec
```

## Front end

### Installation

Navigate to `/frontend/record_collection`

```
cd frontend/record_collection
```

Install the required dependencies:

```
yarn install
```

Run the development server:

```
yarn dev
```

Visit the front end in your browser at [http://localhost:3005](http://localhost:3005)
