require 'rails_helper'

RSpec.describe Record, type: :model do
  let(:record) { FactoryBot.build(:record) }

  it 'is valid with a record title, release_year, state and artist' do
    expect(record).to be_valid
  end

  it 'is not valid without a record condition' do
    record.condition = nil
    expect(record).to_not be_valid
    expect(record.errors[:condition]).to include("can't be blank")
  end

  it 'is not valid without an artist' do
    record.artist = nil
    expect(record).to_not be_valid
    expect(record.errors[:artist]).to include("can't be blank")
  end

  it 'is not valid without a record title' do
    record.title = ''
    expect(record).to_not be_valid
    expect(record.errors[:title]).to include("can't be blank")
  end

  it 'is not valid without a record release year' do
    record.release_year = nil
    expect(record).to_not be_valid
    expect(record.errors[:release_year]).to include("can't be blank")
  end
end
