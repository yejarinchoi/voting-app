class AddVotersTable < ActiveRecord::Migration[7.0]
  def change
    create_table :voters do |t|
      t.timestamps
      t.string :email
      t.string :password
      t.string :zip_code
      t.references :performer, foreign_key: true
    end
  end
end
