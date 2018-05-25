class Podcast < ApplicationRecord
  include Amazon
  attr_accessor :presigned_url

  has_many :audios
  accepts_nested_attributes_for :audios, allow_destroy: true
  validates :title, presence: true

end
