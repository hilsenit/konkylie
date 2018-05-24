class PodcastsController < ApplicationController

  def index
    podcasts = Podcast.includes(:audios)
    respond_to { |format| format.json { render json: podcasts } }
  end

  def new
  end

  def edit
  end

  def delete
  end

  def create
    podcast = Podcast.new(podcast_params)
    if podcast.save
      # Arhhhh TO_JSON!
      response = { podcast: podcast.to_json(include: :audios), presigned_url: podcast.presigned_url }
      render json: response, status: 200
    else
      respond_with_errors(podcast.errors)
    end
  end

  private

  def respond_with_errors(errors)
    render json: { errors: errors }, status: :bad_request # Check status in Angular
  end

  def podcast_params
    params.require(:podcast).permit(
      :title,
      :subtitle,
      :summary,
      :publicationDate,
      :poster,
      :duration,
      audios_attributes:
        [:podcast_id, :presigned_url, :url, :mimeType, :size, :title, :file])
  end

end
