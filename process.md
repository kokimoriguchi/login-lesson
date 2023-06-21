# 作成手順書

## rails

1. .env ファイル作成し、gem 'dotenv-rails'記述し、gem "bcrypt", "~> 3.1.7"と gem "rack-cors"のコメントアウト解除し bundle install 実施。rails db:create まで行い rails 立ち上がるのを確認する
2. route ファイルに namespace 設定し、api/v1 での route 設定しておく。
3. gem 'devise'と gem 'devise_token_auth'を gemfile に記述し bundle install
4. rails g devise:install 　 → rails g devise_token_auth:install User auth 　 → rails db:migrate の順番で実行する。
5. ./app/config/initializers/devise_token_auth.rb にファイル作成されるので 45 行目あたりの config.headers_names の部分をコメントアウト解除する
6. ./config/initializers/cors.rb ファイルの header 記述の下に次の記述を追記する expose: ["access-token", "expiry", "token-type", "uid", "client"],
7. rails g controller api/v1/auth/registrations と rails g controller api/v1/auth/sessions でコントローラーの作成し下記記述

```ruby:./app/controllers/api/v1/auth/registrations_controller.rb
# アカウント作成用コントローラー
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
end
```

```ruby:./app/controllers/api/v1/auth/sessions_controller.rb
# ログイン状態確認用コントローラー
class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end
```

8. route ファイルの編集で下記の様に設定する。

```ruby:./app/config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
```

9. この時点で postman にて確認できる。post メソッドで"http://localhost:3001/api/v1/auth"でユーザー登録できる。
10. 上記でユーザー登録した際に header の情報で access-token・uid・client の情報がログインの際に必要になるので、コピーする。
11. post メソッドで"http://localhost:3001/api/v1/auth/sign_in"で header に上記 3 つを key に設定し、value の部分に先ほどコピーしたものをそれぞれ記述して実行するとログインできる

## react

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
