# frozen_string_literal: true

# frozen_string_literal: true

require "rails_helper"

RSpec.describe PerformersController, type: :controller do
  let(:voter) { create(:voter) }
  before do
    session[:voter_id] = voter.id
  end

  render_views

  describe "#index" do
    let(:performer1) { create(:performer, name: "Beetles") }
    let!(:performer2) { create(:performer, name: "Frank Potion") }

    before do
      voter.update(performer_id: performer1.id)
    end

    it "renders the page and shows all performers with their votes" do
      get :index

      expect(response).to be_ok
      expect(response.body).to include(performer1.name)
      expect(response.body).to include("1")
      expect(response.body).to include(performer2.name)
      expect(response.body).to include("0")
    end
  end

  describe "#create" do
    let(:name) { "Haneul" }
    let(:params) {
      {
        performer: {
          name: name
        }
      }
    }

    context "with valid params" do
      it "creates a new performer and updates voter's choice" do
        expect do
          post :create, params: params
        end.to change(Performer, :count).by 1

        expect(voter.reload.performer_id).to eq(Performer.last.id)
        expect(response).to be_ok
      end
    end

    context "with invalid params" do
      let(:name) { "" }

      it "does not create a voter and sends back error" do
        expect do
          post :create, params: params
        end.not_to change(Performer, :count)

        expect(voter.reload.performer_id).to be_nil
        expect(response).not_to be_ok
      end
    end
  end

  describe "#cast_vote" do
    let(:performer) { create(:performer, name: "Odd Ducks") }
    let(:performer_id) { performer.id }
    let!(:params) {
      {
        performer: {
          performer_id: performer_id
        }
      }
    }

    context "with valid params" do
      it "does not create a new performer and updates voter's choice" do
        expect do
          put :cast_vote, params: params
        end.not_to change(Performer, :count)

        expect(voter.reload.performer_id).to eq(performer.id)
        expect(response).to be_ok
      end
    end

    context "with invalid params" do
      let(:performer_id) { "" }

      it "does not create a voter, does not update choice, and sends back error" do
        expect do
          put :cast_vote, params: params
        end.not_to change(Performer, :count)

        expect(voter.reload.performer_id).to be_nil
        expect(response).not_to be_ok
      end
    end
  end
end
