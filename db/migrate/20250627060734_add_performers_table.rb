class AddPerformersTable < ActiveRecord::Migration[7.0]
  def change
    create_table :performers do |t|
      t.timestamps
      t.string :name, null: false
    end
  end
end
