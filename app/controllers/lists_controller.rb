class ListsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    @list = List.new(name: params[:list][:name], user_id: current_user.id)
    if @list.save
      render json: List.where(user_id: current_user.id), each_serializer: ListIndexSerializer
    else
      render json: { error: @list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    target_id = destroy_list_params["id"]

    if !current_user.nil? && current_user == List.find(target_id).user
      List.find(target_id).delete
      render json: List.where(user_id: current_user.id), each_serializer: ListIndexSerializer
    else
      render json: { error: @list.errors.full_messages }, status: :unprocessable_entity
    end

  end

  private
  def list_params
    params.require(:list).permit(:name)
  end

  def destroy_list_params
    params.require(:list).permit(:id)
  end

end
