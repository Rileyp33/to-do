class ListIndexSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :created_at, :updated_at, :tasks

  def tasks
    object.tasks
  end
end
