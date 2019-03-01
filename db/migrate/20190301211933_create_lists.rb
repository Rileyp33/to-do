class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.belongs_to :user, null: false
      t.string :name, null: false
      t.timestamps
    end
  end
end
