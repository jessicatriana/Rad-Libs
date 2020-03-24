Rails.application.routes.draw do
  resources :completed_rad_libs, only: [:index, :show, :destroy]
  resources :rad_lib_templates, only: [:index, :show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
