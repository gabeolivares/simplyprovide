class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :job_type
      t.string :description
      t.string :timeline
      t.decimal :price

      t.timestamps null: false
    end
  end
end
