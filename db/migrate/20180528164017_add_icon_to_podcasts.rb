class AddIconToPodcasts < ActiveRecord::Migration[5.1]
  def change
    add_column :podcasts, :icon, :string
  end
end
