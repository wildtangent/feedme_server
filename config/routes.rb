FeedmeServer::Application.routes.draw do
  resources :notifications
  root to: "notifications#index"  
end
