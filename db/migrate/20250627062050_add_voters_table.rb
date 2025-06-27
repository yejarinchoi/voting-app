class AddVotersTable < ActiveRecord::Migration[7.0]
  def change
    create_table :voters do |t|
      t.timestamps
      t.string :email, null: false
      t.string :password, null: false
      t.string :zip_code, null: false
      t.references :performer, foreign_key: true
    end
  end
end
