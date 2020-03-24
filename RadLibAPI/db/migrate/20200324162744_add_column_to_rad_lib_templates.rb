class AddColumnToRadLibTemplates < ActiveRecord::Migration[6.0]
  def change
    add_column :rad_lib_templates, :word_blank, :string
  end
end
