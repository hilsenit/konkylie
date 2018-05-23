class CreateAudios < ActiveRecord::Migration[5.1]
  def change
    create_table :audios do |t|
      t.references :podcast, foreign_key: true
      t.string :url
      t.string :mimeType
      t.integer :size
      t.string :title

      t.timestamps
    end
  end
end
