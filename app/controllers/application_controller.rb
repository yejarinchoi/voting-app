class ApplicationController < ActionController::Base
  before_action :logged_in_user_email

  def logged_in_user_email
    @current_user_email = nil
    if session[:voter_id].present?
      current_user = Voter.find_by(id: session[:voter_id])
      @current_user_email = current_user&.email
    end
  end
end
