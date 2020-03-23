class CreateRadLibTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :rad_lib_templates do |t|
      t.string :name
      t.text :content 
      
      t.timestamps
    end
  end
end
