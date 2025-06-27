class PerformersController < ApplicationController
  def index
    @performers = Performer.all.map { |performer| { id: performer.id, name: performer.name } }
  end

  def create
    @performer = Performer.new
    @performer.assign_attributes(name: new_performer_params[:name])

    if @performer.valid?
      @performer.save!
      @performer_id = @performer.id
      update_voter_choice
    else
      render json: { errors: @performer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def cast_vote
    @performer_id = existing_performer_params[:performer_id]
    if @performer_id.present?
      update_voter_choice
    else
      render json: { errors: "You must choose a performer" }, status: :unprocessable_entity
    end
  end

  private

  def update_voter_choice
    current_voter = Voter.find(session[:voter_id])

    current_voter&.assign_attributes(performer_id: @performer_id)

    if current_voter&.valid?
      current_voter.save!
      render json: { message: "Successfully updated voter choice" }
    else
      render json: { errors: current_voter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def existing_performer_params
    params.require(:performer).permit(:performer_id)
  end

  def new_performer_params
    params.require(:performer).permit(:name)
  end
end
