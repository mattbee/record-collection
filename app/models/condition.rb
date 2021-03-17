class Condition < ApplicationRecord
  has_many :record

  validates_presence_of :state
end
