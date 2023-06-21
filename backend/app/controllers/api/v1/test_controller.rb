class Api::V1::TestController < ApplicationController
  def index
    render json: {message: "HELLO WORLD"}
  end
end
