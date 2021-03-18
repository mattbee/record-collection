Rails.application.routes.draw do
  get '/conditions/', to: 'conditions#index'
  resources :records
end
