class Podcast < ApplicationRecord
  has_many :audios
  accepts_nested_attributes_for :audios

  validates :title, presence: true
end
