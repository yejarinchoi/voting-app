# == Schema Information
#
# Table name: voters
#
#  id           :integer          not null, primary key
#  email        :string           not null
#  password     :string           not null
#  zip_code     :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  performer_id :integer
#
# Indexes
#
#  index_voters_on_performer_id  (performer_id)
#
# Foreign Keys
#
#  performer_id  (performer_id => performers.id)
#
class Voter < ApplicationRecord
  belongs_to :performer, optional: true

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :zip_code, presence: true
end
