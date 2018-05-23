class CreatePodcasts < ActiveRecord::Migration[5.1]
  def change
    create_table :podcasts do |t|
      t.string :title
      t.string :subtitle
      t.text :summary
      t.date :publicationDate
      t.string :poster
      t.string :duration

      t.timestamps
    end
  end
end
