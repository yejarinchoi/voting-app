# == Schema Information
#
# Table name: voters
#
#  id           :integer          not null, primary key
#  email        :string
#  password     :string
#  zip_code     :string
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
  has_one :performer, optional: true
end
