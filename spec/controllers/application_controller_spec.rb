# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationController, type: :controller do
  controller do
    def index
      respond_to do |format|
        format.html { head :ok }
        format.js { head :ok }
      end
    end

    def create
      head :ok
    end
  end

  describe "#logged_in_user_email" do
    context "when user is not in session" do
      it "is nil" do
        expect(subject.logged_in_user_email).to eq nil
      end
    end

    context "when user is in session" do
      before do
        session[:voter_id] = voter_id
      end

      context "user exists" do
        let(:voter) { create(:voter) }
        let(:voter_id) { voter.id }

        it "is user's email" do
          expect(subject.logged_in_user_email).to eq(voter.email)
        end
      end

      context "user does not exists" do
        let(:voter_id) { Voter.last&.id || 0 + 1 } # nonexistent id

        it "is nil" do
          expect(subject.logged_in_user_email).to eq nil
        end
      end
    end
  end
end

