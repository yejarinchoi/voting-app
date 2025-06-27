class VotersController < ApplicationController
  def new
  end

  def create
    # If already created, show an error
    @voter = Voter.new
    @voter.assign_attributes(voter_params)

    if @voter.valid?
      @voter.save
      session[:voter_id] = @voter.id
      render json: { message: "Success" }
    else
      render json: { errors: @voter.errors.full_messages }
    end
  end

  def voter_params
    params.require(:voter).permit(:email, :password, :zip_code)
  end
end
