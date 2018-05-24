class Audio < ApplicationRecord
  include Amazon
  attr_accessor :presigned_url #Is being returned to view in json

  belongs_to :podcast
end
