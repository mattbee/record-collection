class Record < ApplicationRecord
  belongs_to :condition
  belongs_to :artist

  accepts_nested_attributes_for :artist

  validates_presence_of :title
  validates_presence_of :release_year
  validates_presence_of :artist
  validates_presence_of :condition
end
