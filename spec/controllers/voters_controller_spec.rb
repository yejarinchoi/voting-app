# frozen_string_literal: true

require "rails_helper"

RSpec.describe VotersController do
  render_views

  describe "#new" do
    it "renders the page" do
      get :new

      expect(response).to be_ok
    end
  end

  describe "#create" do
    let(:email) { "blue@sky.com" }
    let(:password) { "bl00p2315" }
    let(:zip_code) { "77024" }
    let(:params) {
      {
        voter: {
          email: email,
          password: password,
          zip_code: zip_code
        }
      }
    }

    context "with valid params" do
      it "creates a new voter and sets the voter id on session" do
        expect do
          post :create, params: params
        end.to change(Voter, :count).by 1

        expect(session[:voter_id]).to eq(Voter.last.id)
      end
    end

    context "with invalid params" do
      let(:email) { "" }
      let(:password) { "" }
      let(:zip_code) { "" }

      it "does not create a voter and sends back error" do
        expect do
          post :create, params: params
        end.not_to change(Voter, :count)

        expect(response).not_to be_ok
      end
    end
  end
end
