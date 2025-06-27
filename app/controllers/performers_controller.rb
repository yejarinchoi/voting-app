class PerformersController < ApplicationController
  def index
    @performers = Performer.all.map { |performer| { id: performer.id, name: performer.name } }
  end

  def create
    @performer = Performer.new
    @performer.assign_attributes(name: new_performer_params[:name])

    if @performer.valid?
      @performer.save!
      performer_id = @performer.id
      update_voter_choice(performer_id)
      render json: { message: "Success" }
    else
      render json: { errors: @voter.errors.full_messages }
    end
  end

  def cast_vote
    update_voter_choice(existing_performer_params[:performer_id])
  end

  private

  def update_voter_choice(performer_id)
    current_voter = Voter.find(session[:voter_id])

    # what if current_voter is nil? Shouldn't happen but what if it does...
    current_voter&.assign_attributes(performer_id: performer_id)

    if current_voter&.valid?
      current_voter.save!
    else
      render json: { errors: "Current voter's selection was not updated" }
    end
  end

  def existing_performer_params
    params.require(:performer).permit(:performer_id)
  end

  def new_performer_params
    params.require(:performer).permit(:name)
  end
end
