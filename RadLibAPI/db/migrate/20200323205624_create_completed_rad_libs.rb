class CreateCompletedRadLibs < ActiveRecord::Migration[6.0]
  def change
    create_table :completed_rad_libs do |t|
      t.string :name
      t.text :content 
      t.string :word_blank

      t.timestamps
    end
  end
end
