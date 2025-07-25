Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"

  resources :voters, only: [:new, :create]
  get "/sign_in", to: "voters#new"
  get "/sign_out", to: "voters#sign_out"

  resources :performers, only: [:index, :create] do
    collection do
      put :cast_vote  # this adds PUT /performers/cast_vote => performers#cast_vote
    end
  end

  get "/vote", to: "performers#index"

  get "/results", to: "home#results"
end
