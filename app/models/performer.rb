# == Schema Information
#
# Table name: performers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Performer < ApplicationRecord
  has_many :voters,  dependent: :nullify # can delete a Peformer without deleting associated Voter
  validates :name, presence: true, uniqueness: true
end
