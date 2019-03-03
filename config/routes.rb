Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :lists do
    resources :tasks
  end

  namespace 'api' do
    namespace 'v1' do
      resources :lists, only: [:index] do
        resources :tasks, only: [:index]
      end
    end
  end
end
