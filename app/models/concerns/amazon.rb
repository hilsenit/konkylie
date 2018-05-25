require 'aws-sdk'
module Amazon
  extend ActiveSupport::Concern

  included do
    after_save :create_presigned_url
  end

  def create_presigned_url
    self.audios.each do |audio|
      file_name = "#{audio.title.parameterize}.mp3"
      Aws.config[:credentials]=Aws::Credentials.new(
        ENV["aws_access_key_id"],
        ENV["aws_secret_access_key"]
      )
      s3 = Aws::S3::Resource.new(region: ENV["aws_bucket_region"])
      bucket = ENV["aws_bucket_name"]
      obj = s3.bucket(bucket).object(file_name)
      audio.podcast.presigned_url = obj.presigned_url(:put, acl: 'public-read', expires_in: 3600 * 24)
      audio.update_column(:url, obj.public_url)
    end
  end

end
