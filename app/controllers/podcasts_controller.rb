class PodcastsController < ApplicationController

  def index
    # podcasts = Podcast.all
    podcasts = Podcast.all
    render json: podcasts.to_json(include: :audios)
  end

  def new
  end

  def edit
    podcast = Podcast.find(params[:id])
    response = podcast.to_json(include: :audios)
  rescue
    render json: {error: "Din podcast kunne ikke findes"}, status: :bad_request
  else #Only if the code is run without error!
    render json: response, status: 200
  end

  def delete
  end

  def create
    podcast = Podcast.new(podcast_params)
    if podcast.save
      response = { podcast: podcast.to_json(include: :audios), presigned_url: podcast.presigned_url }
      render json: response, status: 200
    else
      respond_with_errors(podcast.errors)
    end
  end

  def update
    podcast = Podcast.find(params[:id])
    byebug
    if podcast.update_attributes(podcast_params)
      response = { podcast: podcast.to_json(include: :audios), presigned_url: podcast.presigned_url }
      render json: response, status: 200
    else
      respond_with_errors(podcast.errors)
    end
  end

  private

  def respond_with_errors(errors)
    render json: { errors: errors.to_json }, status: :bad_request # Check status in Angular
  end

  def podcast_params
    params.require(:podcast).permit(
      :title,
      :subtitle,
      :summary,
      :publicationDate,
      :poster,
      :icon,
      :duration,
      audios_attributes:
        [ :podcast_id, :presigned_url, :url, :mimeType, :size, :title, :file, :duration ])
  end

end
