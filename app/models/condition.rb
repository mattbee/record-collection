class Condition < ApplicationRecord
  has_many :record

  validates_presence_of :state

  def to_s
    self.state
  end
end
