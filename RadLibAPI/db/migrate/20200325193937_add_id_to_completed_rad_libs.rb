class AddIdToCompletedRadLibs < ActiveRecord::Migration[6.0]
  def change
    add_column :completed_rad_libs, :rad_lib_template_id, :integer
  end
end
