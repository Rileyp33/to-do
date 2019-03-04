class Api::V1::ListsController < ApiController
  def index
    render json: List.all, each_serializer: ListIndexSerializer
  end
end
