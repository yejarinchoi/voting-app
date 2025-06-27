# frozen_string_literal: true

require "rails_helper"

RSpec.describe UsersController do
  render_views

  describe "#new" do
    it "renders the page" do
      get :new

      expect(response).to be_ok
    end
  end
end
