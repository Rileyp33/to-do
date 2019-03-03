class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.belongs_to :list, null: false
      t.string :name, null: false
      t.boolean :completed, default: false
      t.text :notes
      t.timestamps
    end
  end
end
