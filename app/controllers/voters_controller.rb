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
      render json: { message: "Successfully logged in!" }
    else
      render json: { errors: @voter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def sign_out
    session.delete(:voter_id)
    redirect_to root_path
  end

  def voter_params
    params.require(:voter).permit(:email, :password, :zip_code)
  end
end
