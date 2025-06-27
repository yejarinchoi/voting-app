class VotersController < ApplicationController
  def new
  end

  def create
    # If already created, show an error
    @voter = Voter.new
    @voter.assign_attributes(voter_params)

    if @voter.valid?
      @voter.save
      render json: { message: "Success" }
    else
      render json: { message: "Failed to save" }
    end
  end

  def voter_params
    params.require(:voter).permit(:email, :password, :zip_code)
  end
end
