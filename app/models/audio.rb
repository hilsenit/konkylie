class Audio < ApplicationRecord
  belongs_to :podcast

  validates :url, presence: true
end
