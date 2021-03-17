class Artist < ApplicationRecord
  has_many :record

  validates_presence_of :name

  def to_s
    self.name
  end
end
