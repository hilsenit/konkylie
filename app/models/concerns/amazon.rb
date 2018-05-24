require 'aws-sdk'

module Amazon
  extend ActiveSupport::Concern

  included do
    after_save :create_presigned_url
  end

  def create_presigned_url
    file_name = "#{self.title.parameterize}.mp3"
    Aws.config[:credentials]=Aws::Credentials.new(
      ENV["aws_access_key_id"],
      ENV["aws_secret_access_key"]
    )
    s3 = Aws::S3::Resource.new(region: ENV["aws_bucket_region"])
    bucket = ENV["aws_bucket_name"]
    obj = s3.bucket(bucket).object(file_name)
    # Podcast get the presigned_url so it's easier to find on the response json
    # It's after save, so it should have a relationship
    byebug
    self.presigned_url = obj.presigned_url(:put, acl: 'public-read', expires_in: 3600 * 24)
    self.update_column(:url, obj.public_url)
  end
end
