require 'rails_helper'

RSpec.describe Artist, type: :model do
  let(:artist) { FactoryBot.build(:artist) }

  it 'is valid with an artist name' do
    expect(artist).to be_valid
  end

  it 'is not valid without an artist name' do
    artist.name = ''
    expect(artist).to_not be_valid
  end
end
