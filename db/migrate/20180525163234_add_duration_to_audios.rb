class AddDurationToAudios < ActiveRecord::Migration[5.1]
  def change
    add_column :audios, :duration, :integer
  end
end
