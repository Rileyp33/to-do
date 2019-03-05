class Api::V1::ListsController < ApiController
  def index
    render json: List.where(user_id: current_user.id), each_serializer: ListIndexSerializer
  end
end
