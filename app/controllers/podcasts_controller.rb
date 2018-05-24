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
    byebug
    podcast = Podcast.new(podcast_params)
    if podcast.save
      render json: podcast, status: 200
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
        [:podcast_id, :url, :mimeType, :size, :title, :file])
  end


end
