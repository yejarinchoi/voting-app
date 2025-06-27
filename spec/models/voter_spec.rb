require 'rails_helper'

describe Voter do
  describe "validations" do
    let(:email) { "voter@example.com" }
    let(:password) { "aGoodPasswordProbably" }
    let(:zip_code) { "12345" }
    let(:voter) { build(:voter, email: email, password: password, zip_code: zip_code) }

    context "with all required data" do
      it "is valid" do
        expect(voter).to be_valid
      end
    end

    context "email" do
      context "missing" do
        let(:email) { nil }

        it "is invalid" do
          expect(voter).not_to be_valid
          expect(voter.errors.full_messages).to include("Email can't be blank")
        end
      end

      context "already used" do
        let!(:existing_voter) { create(:voter, email: email, password: "willThisBeGood", zip_code: "22451") }

        it "is invalid" do
          expect(voter).not_to be_valid
          expect(voter.errors.full_messages).to include("Email has already been taken")
        end
      end

      # context "invalid format" do
      #
      # end
    end

    context "password" do
      context "missing" do
        let(:password) { nil }

        it "is invalid" do
          expect(voter).not_to be_valid
          expect(voter.errors.full_messages).to include("Password can't be blank")
        end
      end
    end

    context "zip_code" do
      context "missing" do
        let(:zip_code) { nil }

        it "is invalid" do
          expect(voter).not_to be_valid
          expect(voter.errors.full_messages).to include("Zip code can't be blank")
        end
      end
    end
  end
end
