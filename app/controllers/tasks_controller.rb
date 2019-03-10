class TasksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    @task = Task.new(list_id: params[:task][:id], name: params[:task][:name], completed: false, notes: params[:task][:notes])
    if @task.save
      render json: List.where(user_id: current_user.id), each_serializer: ListIndexSerializer
    else
      render json: { error: @list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    target_id = destroy_task_params["id"]

    if !current_user.nil?
      Task.find(target_id).delete
      render json: List.where(user_id: current_user.id), each_serializer: ListIndexSerializer
    else
      render json: { error: @list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    target_id = update_task_params["task_id"]

    if !current_user.nil?
      task = Task.find(target_id)
      task.name = update_task_params["name"]
      task.notes = update_task_params["notes"]
      task.save
      render json: List.where(user_id: current_user.id), each_serializer: ListIndexSerializer
    else
      render json: { error: @list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def task_params
    params.require(:task).permit(:name, :notes, :id)
  end

  def destroy_task_params
    params.require(:task).permit(:id)
  end

  def update_task_params
    params.require(:task).permit(:list_id, :task_id, :name, :notes)
  end
end
