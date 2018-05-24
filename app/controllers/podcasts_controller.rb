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
    respond = podcast.save ? "true" : "false"
    respond_to { |format| format.json { render json: { "success": respond} } }
  end

  private

  def podcast_params
    params.require(:podcast).permit(
      :title,
      :subtitle,
      :summary,
      :publicationDate,
      :poster,
      :duration,
      audio_attributes:
        [:podcast_id, :url, :mimeType, :size, :title])
  end


end
