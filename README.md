## Author Note:
Hi! Apologies for haphazard styling for the react components. I haven't worked with them in years so it took me a lot of time
trying to ramp up to make changes. A lot of the code is brute forced and I'd love to learn how I could refactor + DRY things up. 

Things I would've liked to spend more time on if this was a real project:
- Actual validation on email & zip code format
- Encrypt passwords
- Redirect on the sign in page if already logged in (you already logged in! You can view the results here)
  - Also not show the “sign in” link on home page if already logged in
- Fuzzy matching on similar performer's name
- Add some sort of javascript testing framework
- Use a less complicated looking table
- Figure out hosting? Can host a branch on heroku for quick demo.


# Voting app for interview exercises

This Rails and React application is the starting point for our Voting app
interview exercise. You may not need all the various files included to complete
the assignment, but they are here in case they help you move faster! Please
modify anything you need to in order to meet the requirements and show us your
own approach.

## Installation

Your development environment should have:

* Ruby v3.1.2
* [Bundler](https://bundler.io/)
* Node v20.18.2
* Yarn v1.22.19
* git
* [SQLite3](https://www.sqlite.org/)

Initialize git, install the application, and initialize the database:

```sh
# First, download the zip file, unzip the directory,
# and navigate into the project directory. Then:
git init
git add .
git commit -m "Initial files provided"
bundle install
bundle exec rake db:migrate

# Install JS packages, including React
yarn install
```

## Running the app

```sh
bundle exec rails server
```

Visit [http://localhost:3000](http://localhost:3000) in your browser

For asset live reloading, run:
```sh
./bin/shakapacker-dev-server
```

If the assets ever get out of sync, delete `/public/packs` and restart your
Rails server (and your shakapacker-dev-server if it was running).

## Running tests

The included test suite uses Rspec and Capybara.

Check out `spec/requests/` for example tests.

```sh
# Run all tests
bundle exec rspec

# Run one test file
bundle exec rspec <path/to/the/file.rb>

# Run one test case inside a test file
bundle exec rspec <path/to/the/file.rb>:<line_number>
```

## Accessing the Rails console

```sh
bundle exec rails console
```

## Debugging

You can open up a debugging console by adding `binding.pry` anywhere in test or
application code.

Example:

```rb
def show
  binding.pry
  render json: { data: @my_object }, status: :ok
end
```

In this example, when the `show` method is hit during click testing or a test,
a debugger will open up in the terminal, where you can inspect values:

```rb
@my_object.id
@my_object.valid?
```

Step to the next line with `next`. Resume regular code execution or tests with
`continue`.
