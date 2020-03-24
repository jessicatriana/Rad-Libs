class RemoveColumnFromCompletedRadLibs < ActiveRecord::Migration[6.0]
  def change
    remove_column :completed_rad_libs, :word_blank
  end
end
