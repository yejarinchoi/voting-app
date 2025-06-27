require 'rails_helper'

describe Performer do
  describe "validations" do
    let(:name) { "Dominick" }
    let(:performer) { build(:performer, name: name) }

    context "with all required data" do
      it "is valid" do
        expect(performer).to be_valid
      end
    end

    context "name" do
      context "missing" do
        let(:name) { nil }

        it "is invalid" do
          expect(performer).not_to be_valid
          expect(performer.errors.full_messages).to include("Name can't be blank")
        end
      end

      context "already used" do
        let!(:existing_performer) { create(:performer, name: name) }

        it "is invalid" do
          expect(performer).not_to be_valid
          expect(performer.errors.full_messages).to include("Name has already been taken")
        end
      end
    end
  end
end
