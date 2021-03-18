Rails.application.routes.draw do
  get '/conditions/', to: 'conditions#index'
  resources :records
  get '/search/:text', to: 'records#search'
end
