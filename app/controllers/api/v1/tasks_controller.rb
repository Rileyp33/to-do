class Api::V1::TasksController < ApiController
  def index
    render json: Task.where({list_id: params["list_id"]})
  end
end
