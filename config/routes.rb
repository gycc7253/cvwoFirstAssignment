Rails.application.routes.draw do
  get 'tasks/index'
  post 'tasks/create'
  get '/show/:id', to: 'tasks#show'
  delete '/destroy/:id', to: 'tasks#destroy'
 	
  resources :tasks do
	get :search, on: :collection
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
	
  #root 'homepage#index'
  #get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
